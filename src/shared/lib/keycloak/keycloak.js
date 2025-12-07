import Keycloak from 'keycloak-js';

const url = import.meta.env.VITE_KC_URL || import.meta.env.VITE_KEYCLOAK_URL || 'http://localhost:8080';
const realm = import.meta.env.VITE_KC_REALM || import.meta.env.VITE_KEYCLOAK_REALM || 'dev';
const clientId = import.meta.env.VITE_KC_USER || import.meta.env.VITE_KEYCLOAK_CLIENT_ID || 'dev-client';

const keycloakConfig = {
  url,
  realm,
  clientId,
};

if (!import.meta.env.VITE_KC_URL && !import.meta.env.VITE_KEYCLOAK_URL) {
  console.warn('Keycloak URL is not set (VITE_KC_URL or VITE_KEYCLOAK_URL) in .env file');
}

if (!import.meta.env.VITE_KC_REALM && !import.meta.env.VITE_KEYCLOAK_REALM) {
  console.warn('Keycloak realm is not set (VITE_KC_REALM or VITE_KEYCLOAK_REALM) in .env file');
}

if (!import.meta.env.VITE_KC_USER && !import.meta.env.VITE_KEYCLOAK_CLIENT_ID) {
  console.warn('Keycloak clientId is not set (VITE_KC_USER or VITE_KEYCLOAK_CLIENT_ID) in .env file');
}

const keycloak = new Keycloak(keycloakConfig);

export default keycloak;
