import { startRegistration, startAuthentication } from '@simplewebauthn/browser';
import { apolloClient } from './apollo';
import { gql } from '@apollo/client';

const REGISTER_USER_MUTATION = gql`
  mutation RegisterUser($email: String!, $username: String!) {
    registerUser(email: $email, username: $username) {
      challenge
      rp {
        name
        id
      }
      user {
        id
        name
        displayName
      }
      pubKeyCredParams {
        alg
        type
      }
      timeout
      attestation
      authenticatorSelection {
        authenticatorAttachment
        residentKey
        userVerification
      }
    }
  }
`;

const VERIFY_REGISTRATION_MUTATION = gql`
  mutation VerifyRegistration($email: String!, $response: RegistrationResponseInput!) {
    verifyRegistration(email: $email, response: $response) {
      token
      user {
        id
        email
        username
      }
    }
  }
`;

const START_AUTHENTICATION_MUTATION = gql`
  mutation StartAuthentication($email: String) {
    startAuthentication(email: $email) {
      challenge
      timeout
      rpId
      userVerification
      allowCredentials {
        id
        type
        transports
      }
    }
  }
`;

const VERIFY_AUTHENTICATION_MUTATION = gql`
  mutation VerifyAuthentication($response: AuthenticationResponseInput!) {
    verifyAuthentication(response: $response) {
      token
      user {
        id
        email
        username
      }
    }
  }
`;

export async function registerWithWebAuthn(email: string, username: string) {
  try {
    // Step 1: Get registration options from server
    const { data } = await apolloClient.mutate({
      mutation: REGISTER_USER_MUTATION,
      variables: { email, username },
    });

    const options = data.registerUser;

    // Step 2: Start WebAuthn registration on the client
    const registrationResponse = await startRegistration(options);

    // Filter out clientExtensionResults as it's not needed and causes GraphQL errors
    const { clientExtensionResults, ...filteredResponse } = registrationResponse;

    // Step 3: Verify registration on the server
    const { data: verifyData } = await apolloClient.mutate({
      mutation: VERIFY_REGISTRATION_MUTATION,
      variables: {
        email,
        response: filteredResponse,
      },
    });

    return verifyData.verifyRegistration;
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
}

export async function authenticateWithWebAuthn(email?: string) {
  try {
    // Step 1: Get authentication options from server
    const { data } = await apolloClient.mutate({
      mutation: START_AUTHENTICATION_MUTATION,
      variables: { email },
    });

    const options = data.startAuthentication;

    // Step 2: Start WebAuthn authentication on the client
    const authenticationResponse = await startAuthentication(options);

    // Filter out clientExtensionResults as it's not needed and causes GraphQL errors
    const { clientExtensionResults, ...filteredResponse } = authenticationResponse;

    // Step 3: Verify authentication on the server
    const { data: verifyData } = await apolloClient.mutate({
      mutation: VERIFY_AUTHENTICATION_MUTATION,
      variables: {
        response: filteredResponse,
      },
    });

    return verifyData.verifyAuthentication;
  } catch (error) {
    console.error('Authentication error:', error);
    throw error;
  }
}

export function isWebAuthnSupported(): boolean {
  return !!(
    window?.PublicKeyCredential
  );
}

