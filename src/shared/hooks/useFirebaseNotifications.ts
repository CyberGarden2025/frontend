import { useEffect, useState } from 'react';
import { getToken, onMessage, type Messaging } from 'firebase/messaging';
import { getMessagingInstance } from '@shared/config';

type NotificationPermission = 'default' | 'granted' | 'denied';

interface UseFirebaseNotificationsReturn {
    token: string | null;
    permission: NotificationPermission;
    requestPermission: () => Promise<void>;
    messaging: Messaging | null;
}

export const useFirebaseNotifications = (): UseFirebaseNotificationsReturn => {
    const [token, setToken] = useState<string | null>(null);
    const [permission, setPermission] = useState<NotificationPermission>('default');
    const [messaging, setMessaging] = useState<Messaging | null>(null);

    useEffect(() => {
        if (typeof window === 'undefined' || !('Notification' in window)) {
            return;
        }

        const messagingInstance = getMessagingInstance();
        if (!messagingInstance) {
            return;
        }

        setMessaging(messagingInstance);
        setPermission(Notification.permission as NotificationPermission);

        const requestNotificationPermission = async () => {
            try {
                const currentToken = await getToken(messagingInstance, {
                    vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
                });
                if (currentToken) {
                    setToken(currentToken);
                } else {
                    setPermission(Notification.permission as NotificationPermission);
                }
            } catch (error) {
                console.error('Error getting token:', error);
            }
        };

        if (Notification.permission === 'granted') {
            requestNotificationPermission();
        }

        const unsubscribe = onMessage(messagingInstance, (payload) => {
            if (Notification.permission === 'granted') {
                new Notification(payload.notification?.title || 'Notification', {
                    body: payload.notification?.body,
                    icon: payload.notification?.icon,
                });
            }
        });

        return () => {
            unsubscribe();
        };
    }, []);

    const requestPermission = async (): Promise<void> => {
        if (typeof window === 'undefined' || !('Notification' in window)) {
            return;
        }

        try {
            const permission = await Notification.requestPermission();
            setPermission(permission as NotificationPermission);

            if (permission === 'granted' && messaging) {
                try {
                    const currentToken = await getToken(messaging, {
                        vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
                    });
                    if (currentToken) {
                        setToken(currentToken);
                    }
                } catch (error) {
                    console.error('Error getting token after permission granted:', error);
                }
            }
        } catch (error) {
            console.error('Error requesting notification permission:', error);
        }
    };

    return {
        token,
        permission,
        requestPermission,
        messaging,
    };
};

