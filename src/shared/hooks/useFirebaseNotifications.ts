import { useEffect, useState } from 'react';
import { getToken, onMessage, type Messaging } from 'firebase/messaging';
import { getMessagingInstance } from '@shared/config';
import { useUpdateFcmTokenMutation } from '@shared/api/mainApi';
import { sendNotificationClientLog } from '@shared/lib/notificationClientLog';

type NotificationPermission = 'default' | 'granted' | 'denied';

interface UseFirebaseNotificationsOptions {
    userId?: string | number;
}

interface UseFirebaseNotificationsReturn {
    token: string | null;
    permission: NotificationPermission;
    requestPermission: () => Promise<void>;
    messaging: Messaging | null;
    lastNotification: {
        title: string;
        body?: string;
        data?: Record<string, unknown>;
        receivedAt: number;
    } | null;
}

export const useFirebaseNotifications = (
    options?: UseFirebaseNotificationsOptions,
): UseFirebaseNotificationsReturn => {
    const { userId } = options || {};
    const userIdStr = userId !== undefined && userId !== null ? String(userId) : undefined;
    const [token, setToken] = useState<string | null>(null);
    const [permission, setPermission] = useState<NotificationPermission>('default');
    const [messaging, setMessaging] = useState<Messaging | null>(null);
    const [syncedToken, setSyncedToken] = useState<string | null>(null);
    const [updateFcmToken] = useUpdateFcmTokenMutation();
    const [lastNotification, setLastNotification] = useState<UseFirebaseNotificationsReturn['lastNotification']>(null);

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
                    sendNotificationClientLog({
                        event: 'token_received',
                        userId: userIdStr,
                        token: currentToken,
                    });
                } else {
                    setPermission(Notification.permission as NotificationPermission);
                }
            } catch (error) {
                console.error('Error getting token:', error);
                sendNotificationClientLog({
                    event: 'token_receive_error',
                    userId: userIdStr,
                    payload: { error: String(error) },
                });
            }
        };

        if (Notification.permission === 'granted') {
            requestNotificationPermission();
        }

        const unsubscribe = onMessage(messagingInstance, (payload) => {
            console.log('Foreground message received:', payload);
            if (Notification.permission === 'granted') {
                new Notification(payload.notification?.title || 'Notification', {
                    body: payload.notification?.body,
                    icon: payload.notification?.icon,
                });
                setLastNotification({
                    title: payload.notification?.title || 'Notification',
                    body: payload.notification?.body,
                    data: payload.data,
                    receivedAt: Date.now(),
                });
                sendNotificationClientLog({
                    event: 'foreground_notification_received',
                    userId: userIdStr,
                    payload,
                });
            }
        });

        return () => {
            unsubscribe();
        };
    }, []);

    useEffect(() => {
        if (token && !userIdStr) {
            console.warn('FCM token is available but userId is not provided, skipping backend sync');
        }
    }, [token, userIdStr]);

    useEffect(() => {
        if (!token || !userIdStr || token === syncedToken) {
            return;
        }

        updateFcmToken({ userId: userIdStr, fcmToken: token })
            .unwrap()
            .then(() => {
                setSyncedToken(token);
                sendNotificationClientLog({
                    event: 'token_synced',
                    userId: userIdStr,
                    token,
                });
            })
            .catch(error => {
                console.error('Error saving FCM token:', error);
                sendNotificationClientLog({
                    event: 'token_sync_error',
                    userId: userIdStr,
                    token,
                    payload: { error: String(error) },
                });
            });
    }, [token, userIdStr, updateFcmToken, syncedToken]);

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
        lastNotification,
    };
};
