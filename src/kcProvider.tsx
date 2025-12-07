import { ReactKeycloakProvider } from '@react-keycloak/web';
import Keycloak from 'keycloak-js';
import type { ReactNode } from 'react';

import { apiService } from './authInstance';
import { ENVS } from './env';

const keycloak = new Keycloak({
    url: ENVS.KC_URL,
    realm: ENVS.KC_REALM,
    clientId: ENVS.KC_USER,
});

const initOptions = {
    onLoad: 'login-required' as const,
    pkceMethod: 'S256' as const,
    checkLoginIframe: false,
};

export const KeycloakWrapper = ({ children }: { children: ReactNode }) => (
    <ReactKeycloakProvider
        authClient={keycloak}
        initOptions={initOptions}
        onTokens={tokens => {
            if (tokens?.token) {
                localStorage.setItem('accessToken', tokens.token);
                apiService.setup(tokens.token);
            } else {
                localStorage.removeItem('accessToken');
            }
        }}
    >
        {children}
    </ReactKeycloakProvider>
);

export { keycloak };
