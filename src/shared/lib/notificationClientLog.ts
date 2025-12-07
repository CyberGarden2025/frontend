import { apiBaseUrl } from '@shared/api/mainApi';
import { keycloak } from '../../kcProvider';

type ClientLogPayload = {
    event: string;
    userId?: string | number;
    token?: string | null;
    payload?: unknown;
};

export const sendNotificationClientLog = async (data: ClientLogPayload): Promise<void> => {
    try {
        const headers: Record<string, string> = {
            'Content-Type': 'application/json',
        };

        if (keycloak?.authenticated) {
            try {
                await keycloak.updateToken(30);
                if (keycloak.token) {
                    headers.Authorization = `Bearer ${keycloak.token}`;
                }
            } catch (error) {
                console.warn('Cannot refresh Keycloak token for client log', error);
            }
        }

        await fetch(`${apiBaseUrl}/notifications/debug/client-log`, {
            method: 'POST',
            headers,
            body: JSON.stringify(data),
        });
    } catch (error) {
        console.warn('Notification client log failed', error);
    }
};
