import { apiBaseUrl } from '@shared/api/mainApi';

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

        await fetch(`${apiBaseUrl}/notifications/debug/client-log`, {
            method: 'POST',
            headers,
            body: JSON.stringify(data),
        });
    } catch (error) {
        console.warn('Notification client log failed', error);
    }
};
