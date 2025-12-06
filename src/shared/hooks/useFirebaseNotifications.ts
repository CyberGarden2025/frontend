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
            console.log('[Firebase Notifications] Notifications not supported');
            return;
        }

        const initializeMessaging = async () => {
            try {
                if (!('serviceWorker' in navigator)) {
                    console.error('[Firebase Notifications] Service Worker not supported');
                    return;
                }

                const registration = await navigator.serviceWorker.ready;
                console.log('[Firebase Notifications] Service Worker ready:', registration);

                const messagingInstance = getMessagingInstance();
                if (!messagingInstance) {
                    console.error('[Firebase Notifications] Messaging instance not available');
                    return;
                }

                setMessaging(messagingInstance);
                setPermission(Notification.permission as NotificationPermission);

                console.log('[Firebase Notifications] Current permission:', Notification.permission);

                const requestNotificationPermission = async () => {
                    try {
                        console.log('[Firebase Notifications] Requesting token...');
                        const currentToken = await getToken(messagingInstance, {
                            vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
                            serviceWorkerRegistration: registration,
                        });
                        if (currentToken) {
                            console.log('[Firebase Notifications] Token received:', currentToken.substring(0, 20) + '...');
                            setToken(currentToken);
                        } else {
                            console.warn('[Firebase Notifications] No token available. Permission:', Notification.permission);
                            setPermission(Notification.permission as NotificationPermission);
                        }
                    } catch (error) {
                        console.error('[Firebase Notifications] Error getting token:', error);
                        if (error instanceof Error) {
                            console.error('[Firebase Notifications] Error details:', error.message, error.stack);
                        }
                    }
                };

                if (Notification.permission === 'granted') {
                    await requestNotificationPermission();
                } else {
                    console.log('[Firebase Notifications] Permission not granted yet:', Notification.permission);
                }

                const unsubscribe = onMessage(messagingInstance, (payload) => {
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
                        } catch (error) {
                            console.error('[Firebase Notifications] Error showing foreground notification:', error);
                        }
                    } else {
                        console.warn('[Firebase Notifications] Cannot show notification - permission not granted');
                    }
                });

                return () => {
                    unsubscribe();
                };
            } catch (error) {
                console.error('[Firebase Notifications] Error initializing messaging:', error);
            }
        };

        const timeout = setTimeout(() => {
            initializeMessaging();
        }, 1000);

        return () => {
            clearTimeout(timeout);
        };
    }, []);

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
    };
};

