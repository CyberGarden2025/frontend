import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { useKeycloak } from '@react-keycloak/web';

import { apiService, authAxios } from './authInstance';
import { apiBaseUrl } from './shared/api/mainApi';

type UserProfile = {
    id?: string;
    username?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    attributes?: Record<string, unknown>;
};

const UserCtx = createContext<UserProfile | null>(null);

export const UserServiceProvider = ({ children }: { children: ReactNode }) => {
    const { keycloak, initialized } = useKeycloak();
    const [user, setUser] = useState<UserProfile | null>(null);

    useEffect(() => {
        const hasToken = initialized && keycloak?.authenticated && keycloak?.token;
        if (!hasToken) return;

        const init = async () => {
            const token = keycloak.token!;
            apiService.setup(token);
            const userId = keycloak.subject;

            try {
                const profile = await authAxios.get<UserProfile>(
                    `${apiBaseUrl}/users/${userId}/profile`,
                );
                setUser(profile.data);
            } catch (e) {
                console.warn('Cannot load profile', e);
            }
        };

        void init();
    }, [initialized, keycloak?.authenticated, keycloak?.token]);

    return <UserCtx.Provider value={user}>{children}</UserCtx.Provider>;
};

export const useUser = () => useContext(UserCtx);
