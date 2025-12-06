import { useEffect, useState } from 'react';
import { getToken, onMessage, type Messaging } from 'firebase/messaging';
import { getMessagingInstance } from '@shared/config';
import { useUpdateFcmTokenMutation } from '@shared/api/mainApi';
import { sendNotificationClientLog } from '@shared/lib/notificationClientLog';

type NotificationPermission = 'default' | 'granted' | 'denied';

interface UseFirebaseNotificationsOptions {
    userId?: number;
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
    const [token, setToken] = useState<string | null>(null);
    const [permission, setPermission] = useState<NotificationPermission>('default');
    const [messaging, setMessaging] = useState<Messaging | null>(null);
    const [syncedToken, setSyncedToken] = useState<string | null>(null);
    const [updateFcmToken] = useUpdateFcmTokenMutation();
    const [lastNotification, setLastNotification] = useState<UseFirebaseNotificationsReturn['lastNotification']>(null);

    useEffect(() => {
        if (typeof window === 'undefined' || !('Notification' in window)) {
            console.log('[Firebase Notifications] Notifications not supported');
            return;
        }

        let unsubscribe: (() => void) | null = null;

        const initializeMessaging = async () => {
            try {
                const messagingInstance = getMessagingInstance();
                if (!messagingInstance) {
                    console.error('[Firebase Notifications] Messaging instance not available');
                    return;
                }

                setMessaging(messagingInstance);
                setPermission(Notification.permission as NotificationPermission);

                console.log('[Firebase Notifications] Current permission:', Notification.permission);

                if (Notification.permission === 'granted') {
                    try {
                        if (!('serviceWorker' in navigator)) {
                            console.error('[Firebase Notifications] Service Worker not supported');
                            return;
                        }

                        const registration = await navigator.serviceWorker.ready;
                        console.log('[Firebase Notifications] Service Worker ready:', registration);

                        console.log('[Firebase Notifications] Requesting token...');
                        const currentToken = await getToken(messagingInstance, {
                            vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
                            serviceWorkerRegistration: registration,
                        });
                        if (currentToken) {
                            console.log('[Firebase Notifications] Token received:', currentToken.substring(0, 20) + '...');
                            setToken(currentToken);
                            sendNotificationClientLog({
                                event: 'token_received',
                                userId,
                                token: currentToken,
                            });
                        } else {
                            console.warn('[Firebase Notifications] No token available. Permission:', Notification.permission);
                            setPermission(Notification.permission as NotificationPermission);
                        }
                    } catch (error) {
                        console.error('[Firebase Notifications] Error getting token:', error);
                        if (error instanceof Error) {
                            console.error('[Firebase Notifications] Error details:', error.message, error.stack);
                        }
                        sendNotificationClientLog({
                            event: 'token_receive_error',
                            userId,
                            payload: { error: String(error) },
                        });
                    }
                } else {
                    console.log('[Firebase Notifications] Permission not granted yet:', Notification.permission);
                }

                unsubscribe = onMessage(messagingInstance, (payload) => {
                    console.log('[Firebase Notifications] Foreground message received:', payload);
                    console.log('[Firebase Notifications] Payload notification:', payload.notification);
                    console.log('[Firebase Notifications] Payload data:', payload.data);
                    
                    if (Notification.permission === 'granted') {
                        try {
                            const notification = new Notification(
                                payload.notification?.title || 'Notification',
                                {
                                    body: payload.notification?.body,
                                    icon: payload.notification?.icon || '/vite.svg',
                                    badge: '/vite.svg',
                                    tag: 'firebase-notification',
                                }
                            );
                            console.log('[Firebase Notifications] Foreground notification shown:', notification);
                            setLastNotification({
                                title: payload.notification?.title || 'Notification',
                                body: payload.notification?.body,
                                data: payload.data,
                                receivedAt: Date.now(),
                            });
                            sendNotificationClientLog({
                                event: 'foreground_notification_received',
                                userId,
                                payload,
                            });
                        } catch (error) {
                            console.error('[Firebase Notifications] Error showing foreground notification:', error);
                        }
                    } else {
                        console.warn('[Firebase Notifications] Cannot show notification - permission not granted');
                    }
                });
            } catch (error) {
                console.error('[Firebase Notifications] Error initializing messaging:', error);
                sendNotificationClientLog({
                    event: 'token_receive_error',
                    userId,
                    payload: { error: String(error) },
                });
            }
        };

        initializeMessaging();

        return () => {
            if (unsubscribe) {
                unsubscribe();
            }
        };
    }, [userId]);

    useEffect(() => {
        if (token && !userId) {
            console.warn('FCM token is available but userId is not provided, skipping backend sync');
        }
    }, [token, userId]);

    useEffect(() => {
        if (!token || !userId || token === syncedToken) {
            return;
        }

        updateFcmToken({ userId, fcmToken: token })
            .unwrap()
            .then(() => {
                setSyncedToken(token);
                sendNotificationClientLog({
                    event: 'token_synced',
                    userId,
                    token,
                });
            })
            .catch(error => {
                console.error('Error saving FCM token:', error);
                sendNotificationClientLog({
                    event: 'token_sync_error',
                    userId,
                    token,
                    payload: { error: String(error) },
                });
            });
    }, [token, userId, updateFcmToken, syncedToken]);

    const requestPermission = async (): Promise<void> => {
        if (typeof window === 'undefined' || !('Notification' in window)) {
            console.log('[Firebase Notifications] Notifications not supported');
            return;
        }

        try {
            console.log('[Firebase Notifications] Requesting permission...');
            const permission = await Notification.requestPermission();
            console.log('[Firebase Notifications] Permission result:', permission);
            setPermission(permission as NotificationPermission);

            if (permission === 'granted' && messaging) {
                try {
                    if (!('serviceWorker' in navigator)) {
                        console.error('[Firebase Notifications] Service Worker not supported');
                        return;
                    }

                    const registration = await navigator.serviceWorker.ready;
                    console.log('[Firebase Notifications] Service Worker ready for token request');

                    const currentToken = await getToken(messaging, {
                        vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
                        serviceWorkerRegistration: registration,
                    });
                    if (currentToken) {
                        console.log('[Firebase Notifications] Token received after permission:', currentToken.substring(0, 20) + '...');
                        setToken(currentToken);
                    } else {
                        console.warn('[Firebase Notifications] No token available after permission granted');
                    }
                } catch (error) {
                    console.error('[Firebase Notifications] Error getting token after permission granted:', error);
                    if (error instanceof Error) {
                        console.error('[Firebase Notifications] Error details:', error.message, error.stack);
                    }
                }
            }
        } catch (error) {
            console.error('[Firebase Notifications] Error requesting notification permission:', error);
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
