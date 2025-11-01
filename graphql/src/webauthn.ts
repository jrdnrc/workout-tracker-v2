import {
  generateRegistrationOptions,
  verifyRegistrationResponse,
  generateAuthenticationOptions,
  verifyAuthenticationResponse,
} from '@simplewebauthn/server';
import type {
  GenerateRegistrationOptionsOpts,
  GenerateAuthenticationOptionsOpts,
  VerifyRegistrationResponseOpts,
  VerifyAuthenticationResponseOpts,
} from '@simplewebauthn/server';
import type { Pool } from 'pg';
import jwt from 'jsonwebtoken';

const rpName = process.env.RP_NAME || 'Workout Tracker';
const rpID = process.env.RP_ID || 'localhost';
const origin = process.env.ORIGIN || 'http://localhost:5173';

export interface WebAuthnCredential {
  id: string;
  user_id: string;
  credential_id: string;
  public_key: Buffer;
  counter: number;
  transports?: string[];
}

export async function generateRegistrationOptionsForUser(
  pool: Pool,
  userId: string,
  userName: string
) {
  // Get existing credentials for this user
  const result = await pool.query(
    'SELECT credential_id FROM user_credentials WHERE user_id = $1',
    [userId]
  );

  const excludeCredentials = result.rows.map((row) => ({
    id: row.credential_id,
    type: 'public-key' as const,
  }));

  const options = await generateRegistrationOptions({
    rpName,
    rpID,
    userID: userId,
    userName,
    attestationType: 'none',
    excludeCredentials,
    authenticatorSelection: {
      residentKey: 'preferred',
      userVerification: 'preferred',
      authenticatorAttachment: 'platform',
    },
  });

  return options;
}

export async function verifyRegistrationAndStore(
  pool: Pool,
  userId: string,
  response: any,
  expectedChallenge: string
) {
  const verification = await verifyRegistrationResponse({
    response,
    expectedChallenge,
    expectedOrigin: origin,
    expectedRPID: rpID,
  });

  if (!verification.verified || !verification.registrationInfo) {
    throw new Error('Registration verification failed');
  }

  const { credentialPublicKey, credentialID, counter } =
    verification.registrationInfo;

  // Store credential in database
  await pool.query(
    `INSERT INTO user_credentials (user_id, credential_id, public_key, counter, transports)
     VALUES ($1, $2, $3, $4, $5)`,
    [
      userId,
      Buffer.from(credentialID).toString('base64'),
      Buffer.from(credentialPublicKey),
      counter,
      response.response.transports || [],
    ]
  );

  return verification;
}

export async function generateAuthenticationOptionsForUser(
  pool: Pool,
  email?: string
) {
  let allowCredentials: any[] | undefined;

  if (email) {
    // Get user and their credentials
    const userResult = await pool.query(
      'SELECT id FROM users WHERE email = $1',
      [email]
    );

    if (userResult.rows.length === 0) {
      throw new Error('User not found');
    }

    const userId = userResult.rows[0].id;
    const credResult = await pool.query(
      'SELECT credential_id, transports FROM user_credentials WHERE user_id = $1',
      [userId]
    );

    allowCredentials = credResult.rows.map((row) => ({
      id: Buffer.from(row.credential_id, 'base64'),
      type: 'public-key' as const,
      transports: row.transports,
    }));
  }

  const options = await generateAuthenticationOptions({
    rpID,
    userVerification: 'preferred',
    allowCredentials,
  });

  return options;
}

export async function verifyAuthenticationAndGenerateToken(
  pool: Pool,
  response: any,
  expectedChallenge: string
) {
  // Find the credential
  const credentialId = Buffer.from(response.id, 'base64url').toString('base64');
  
  const credResult = await pool.query(
    `SELECT uc.*, u.email, u.username 
     FROM user_credentials uc
     JOIN users u ON u.id = uc.user_id
     WHERE uc.credential_id = $1`,
    [credentialId]
  );

  if (credResult.rows.length === 0) {
    throw new Error('Credential not found');
  }

  const credential = credResult.rows[0];

  const verification = await verifyAuthenticationResponse({
    response,
    expectedChallenge,
    expectedOrigin: origin,
    expectedRPID: rpID,
    authenticator: {
      credentialID: Buffer.from(credential.credential_id, 'base64'),
      credentialPublicKey: credential.public_key,
      counter: credential.counter,
    },
  });

  if (!verification.verified) {
    throw new Error('Authentication verification failed');
  }

  // Update counter
  await pool.query(
    'UPDATE user_credentials SET counter = $1, last_used_at = NOW() WHERE id = $2',
    [verification.authenticationInfo.newCounter, credential.id]
  );

  // Generate JWT
  const token = jwt.sign(
    {
      user_id: credential.user_id,
      email: credential.email,
    },
    process.env.JWT_SECRET || 'your-secret-key',
    { expiresIn: '7d' }
  );

  return {
    token,
    user: {
      id: credential.user_id,
      email: credential.email,
      username: credential.username,
    },
  };
}

