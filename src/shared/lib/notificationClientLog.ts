import { apiBaseUrl } from '@shared/api/mainApi';

type ClientLogPayload = {
    event: string;
    userId?: number;
    token?: string | null;
    payload?: unknown;
};

export const sendNotificationClientLog = async (data: ClientLogPayload): Promise<void> => {
    try {
        await fetch(`${apiBaseUrl}/notifications/debug/client-log`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
    } catch (error) {
        console.warn('Notification client log failed', error);
    }
};
