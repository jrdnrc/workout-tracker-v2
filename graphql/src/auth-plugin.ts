import { makeExtendSchemaPlugin, gql } from 'graphile-utils';
import type { Pool } from 'pg';
import {
  generateRegistrationOptionsForUser,
  verifyRegistrationAndStore,
  generateAuthenticationOptionsForUser,
  verifyAuthenticationAndGenerateToken,
} from './webauthn.js';

// Store challenges temporarily (in production, use Redis)
const challenges = new Map<string, { challenge: string; timestamp: number }>();

// Clean up old challenges every 5 minutes
setInterval(() => {
  const fiveMinutesAgo = Date.now() - 5 * 60 * 1000;
  for (const [key, value] of challenges.entries()) {
    if (value.timestamp < fiveMinutesAgo) {
      challenges.delete(key);
    }
  }
}, 5 * 60 * 1000);

export const AuthPlugin = makeExtendSchemaPlugin(() => {
  return {
    typeDefs: gql`
      type RegistrationOptions {
        challenge: String!
        rp: RegistrationOptionsRP!
        user: RegistrationOptionsUser!
        pubKeyCredParams: [PubKeyCredParam!]!
        timeout: Int
        attestation: String
        authenticatorSelection: AuthenticatorSelection
      }

      type RegistrationOptionsRP {
        name: String!
        id: String!
      }

      type RegistrationOptionsUser {
        id: String!
        name: String!
        displayName: String!
      }

      type PubKeyCredParam {
        alg: Int!
        type: String!
      }

      type AuthenticatorSelection {
        authenticatorAttachment: String
        residentKey: String
        userVerification: String
      }

      type AuthenticationOptions {
        challenge: String!
        timeout: Int
        rpId: String!
        userVerification: String
        allowCredentials: [AllowCredential!]
      }

      type AllowCredential {
        id: String!
        type: String!
        transports: [String!]
      }

      type AuthResult {
        token: String!
        user: User!
      }

      input RegistrationResponseInput {
        id: String!
        rawId: String!
        response: AuthenticatorAttestationResponseInput!
        type: String!
        authenticatorAttachment: String
      }

      input AuthenticatorAttestationResponseInput {
        clientDataJSON: String!
        attestationObject: String!
        transports: [String!]
        publicKeyAlgorithm: Int
        publicKey: String
        authenticatorData: String
      }

      input AuthenticationResponseInput {
        id: String!
        rawId: String!
        response: AuthenticatorAssertionResponseInput!
        type: String!
        authenticatorAttachment: String
      }

      input AuthenticatorAssertionResponseInput {
        clientDataJSON: String!
        authenticatorData: String!
        signature: String!
        userHandle: String
      }

      extend type Mutation {
        registerUser(email: String!, username: String!): RegistrationOptions!
        verifyRegistration(
          email: String!
          response: RegistrationResponseInput!
        ): AuthResult!
        startAuthentication(email: String): AuthenticationOptions!
        verifyAuthentication(
          response: AuthenticationResponseInput!
        ): AuthResult!
      }
    `,
    resolvers: {
      Mutation: {
        registerUser: async (_query, args, context) => {
          const pool: Pool = context.pgClient;
          const { email, username } = args;

          // Check if user already exists
          const existingUser = await pool.query(
            'SELECT id FROM users WHERE email = $1',
            [email]
          );

          let userId: string;

          if (existingUser.rows.length > 0) {
            userId = existingUser.rows[0].id;
          } else {
            // Create new user
            const result = await pool.query(
              'INSERT INTO users (email, username) VALUES ($1, $2) RETURNING id',
              [email, username]
            );
            userId = result.rows[0].id;
          }

          const options = await generateRegistrationOptionsForUser(
            pool,
            userId,
            username
          );

          // Store challenge
          challenges.set(email, {
            challenge: options.challenge,
            timestamp: Date.now(),
          });

          return options;
        },

        verifyRegistration: async (_query, args, context) => {
          const pool: Pool = context.pgClient;
          const { email, response } = args;

          const challengeData = challenges.get(email);
          if (!challengeData) {
            throw new Error('Challenge not found or expired');
          }

          const userResult = await pool.query(
            'SELECT id FROM users WHERE email = $1',
            [email]
          );

          if (userResult.rows.length === 0) {
            throw new Error('User not found');
          }

          const userId = userResult.rows[0].id;

          await verifyRegistrationAndStore(
            pool,
            userId,
            response,
            challengeData.challenge
          );

          challenges.delete(email);

          // Get user details and generate JWT token
          const userDetails = await pool.query(
            'SELECT id, email, username FROM users WHERE id = $1',
            [userId]
          );

          const user = userDetails.rows[0];
          const jwt = await import('jsonwebtoken');
          const token = jwt.default.sign(
            {
              user_id: user.id,
              email: user.email,
            },
            process.env.JWT_SECRET || 'your-secret-key',
            { expiresIn: '7d' }
          );

          return { token, user };
        },

        startAuthentication: async (_query, args, context) => {
          const pool: Pool = context.pgClient;
          const { email } = args;

          const options = await generateAuthenticationOptionsForUser(
            pool,
            email
          );

          // Store challenge
          const key = email || '__global__';
          challenges.set(key, {
            challenge: options.challenge,
            timestamp: Date.now(),
          });

          return options;
        },

        verifyAuthentication: async (_query, args, context) => {
          const pool: Pool = context.pgClient;
          const { response } = args;

          // Try to find challenge (check both email-specific and global)
          let challengeData = challenges.get('__global__');
          
          if (!challengeData) {
            // Try to find by credential ID
            const credentialId = Buffer.from(response.id, 'base64url').toString('base64');
            const credResult = await pool.query(
              `SELECT u.email FROM user_credentials uc
               JOIN users u ON u.id = uc.user_id
               WHERE uc.credential_id = $1`,
              [credentialId]
            );
            
            if (credResult.rows.length > 0) {
              challengeData = challenges.get(credResult.rows[0].email);
            }
          }

          if (!challengeData) {
            throw new Error('Challenge not found or expired');
          }

          const result = await verifyAuthenticationAndGenerateToken(
            pool,
            response,
            challengeData.challenge
          );

          // Clean up challenge
          for (const key of challenges.keys()) {
            const data = challenges.get(key);
            if (data?.challenge === challengeData.challenge) {
              challenges.delete(key);
            }
          }

          return result;
        },
      },
    },
  };
});

