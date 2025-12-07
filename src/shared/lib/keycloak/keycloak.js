import Keycloak from 'keycloak-js';

const keycloakConfig = {
  url: import.meta.env.VITE_KEYCLOAK_URL || 'http://localhost:8080',
  realm: import.meta.env.VITE_KEYCLOAK_REALM || 'master',
  clientId: import.meta.env.VITE_KEYCLOAK_CLIENT_ID || 'react-app',
};

if (!import.meta.env.VITE_KEYCLOAK_URL) {
  console.warn('VITE_KEYCLOAK_URL is not set in .env file');
}

if (!import.meta.env.VITE_KEYCLOAK_REALM) {
  console.warn('VITE_KEYCLOAK_REALM is not set in .env file');
}

if (!import.meta.env.VITE_KEYCLOAK_CLIENT_ID) {
  console.warn('VITE_KEYCLOAK_CLIENT_ID is not set in .env file');
}

const keycloak = new Keycloak(keycloakConfig);

export default keycloak;