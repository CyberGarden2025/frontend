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
            console.warn('[FCM] Notifications not supported in this environment');
            return;
        }

        console.log('[FCM] Initializing Firebase Cloud Messaging...');
        
        const vapidKey = import.meta.env.VITE_FIREBASE_VAPID_KEY;
        if (!vapidKey) {
            console.error('[FCM] VAPID key is not configured. Please set VITE_FIREBASE_VAPID_KEY in .env file');
            return;
        }
        console.log('[FCM] VAPID key found:', vapidKey.substring(0, 20) + '...');

        const messagingInstance = getMessagingInstance();
        if (!messagingInstance) {
            console.error('[FCM] Failed to get messaging instance');
            return;
        }

        console.log('[FCM] Messaging instance created successfully');
        setMessaging(messagingInstance);
        setPermission(Notification.permission as NotificationPermission);
        console.log('[FCM] Current notification permission:', Notification.permission);

        const requestFCMToken = async () => {
            try {
                if (!('serviceWorker' in navigator)) {
                    console.error('[FCM] Service Worker not supported');
                    return;
                }

                const registration = await navigator.serviceWorker.ready;
                console.log('[FCM] Service Worker is ready');

                console.log('[FCM] Requesting FCM token with VAPID key...');
                const currentToken = await getToken(messagingInstance, {
                    vapidKey: vapidKey,
                    serviceWorkerRegistration: registration,
                });
                
                if (currentToken) {
                    console.log('[FCM] ========================================');
                    console.log('[FCM] FCM TOKEN RECEIVED SUCCESSFULLY!');
                    console.log('[FCM] Full token:', currentToken);
                    console.log('[FCM] Token length:', currentToken.length);
                    console.log('[FCM] ========================================');
                    setToken(currentToken);
                    sendNotificationClientLog({
                        event: 'token_received',
                        userId: userIdStr,
                        token: currentToken,
                    });
                } else {
                    console.warn('[FCM] No FCM token available. Permission may not be granted or Service Worker not registered.');
                    setPermission(Notification.permission as NotificationPermission);
                }
            } catch (error) {
                const errorMessage = error instanceof Error ? error.message : String(error);
                console.error('[FCM] Error getting FCM token:', errorMessage);
                console.error('[FCM] Full error:', error);
                
                if (errorMessage.includes('messaging/registration-token-not-ready')) {
                    console.error('[FCM] Service Worker is not ready. Waiting and retrying...');
                    setTimeout(() => {
                        requestFCMToken();
                    }, 2000);
                }
                
                sendNotificationClientLog({
                    event: 'token_receive_error',
                    userId: userIdStr,
                    payload: { error: errorMessage },
                });
            }
        };

        const initializeToken = async () => {
            if (Notification.permission === 'granted') {
                console.log('[FCM] Permission already granted, requesting token...');
                await requestFCMToken();
            } else if (Notification.permission === 'default') {
                console.log('[FCM] Permission is default, requesting permission...');
                try {
                    const permission = await Notification.requestPermission();
                    console.log('[FCM] Permission request result:', permission);
                    setPermission(permission as NotificationPermission);
                    if (permission === 'granted') {
                        await requestFCMToken();
                    } else {
                        console.warn('[FCM] Permission not granted by user');
                    }
                } catch (error) {
                    console.error('[FCM] Error requesting permission:', error);
                }
            } else {
                console.warn('[FCM] Permission denied, cannot get token');
            }
        };

        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.ready.then(() => {
                console.log('[FCM] Service Worker ready, initializing token...');
                initializeToken();
            }).catch((error) => {
                console.error('[FCM] Service Worker registration error:', error);
                setTimeout(() => {
                    initializeToken();
                }, 1000);
            });
        } else {
            initializeToken();
        }

        const unsubscribe = onMessage(messagingInstance, (payload) => {
            console.log('[FCM] Foreground message received:', payload);
            if (Notification.permission === 'granted') {
                try {
                    new Notification(payload.notification?.title || 'Notification', {
                        body: payload.notification?.body,
                        icon: payload.notification?.icon,
                    });
                    console.log('[FCM] Browser notification displayed successfully');
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
                } catch (error) {
                    console.error('[FCM] Error displaying browser notification:', error);
                }
            } else {
                console.warn('[FCM] Notification permission not granted, cannot display notification');
            }
        });

        return () => {
            unsubscribe();
        };
    }, []);

    useEffect(() => {
        if (!token || token === syncedToken) {
            if (token && token === syncedToken) {
                console.log('[FCM] Token already synced, skipping');
            }
            return;
        }

        console.log('[FCM] Starting token sync to backend...', { token: token.substring(0, 20) + '...' });
        
        updateFcmToken({ fcmToken: token })
            .unwrap()
            .then(() => {
                console.log('[FCM] Token successfully synced to backend');
                setSyncedToken(token);
                sendNotificationClientLog({
                    event: 'token_synced',
                    userId: userIdStr,
                    token,
                });
            })
            .catch(error => {
                console.error('[FCM] Error saving FCM token to backend:', error);
                const errorMessage = error && typeof error === 'object' && 'data' in error
                    ? (error.data as { detail?: string; message?: string })?.detail || (error.data as { message?: string })?.message || String(error)
                    : error instanceof Error
                    ? error.message
                    : String(error);
                
                console.error('[FCM] Error details:', {
                    message: errorMessage,
                    token: token.substring(0, 20) + '...',
                    userId: userIdStr,
                });
                
                sendNotificationClientLog({
                    event: 'token_sync_error',
                    userId: userIdStr,
                    token,
                    payload: { error: errorMessage },
                });
            });
    }, [token, updateFcmToken, syncedToken, userIdStr]);

    const requestPermission = async (): Promise<void> => {
        if (typeof window === 'undefined' || !('Notification' in window)) {
            return;
        }

        try {
            const permission = await Notification.requestPermission();
            setPermission(permission as NotificationPermission);

            if (permission === 'granted' && messaging) {
                try {
                    console.log('[FCM] Permission granted, requesting FCM token...');
                    
                    if (!('serviceWorker' in navigator)) {
                        console.error('[FCM] Service Worker not supported');
                        return;
                    }

                    const registration = await navigator.serviceWorker.ready;
                    const vapidKey = import.meta.env.VITE_FIREBASE_VAPID_KEY;
                    
                    if (!vapidKey) {
                        console.error('[FCM] VAPID key is not configured');
                        return;
                    }

                    const currentToken = await getToken(messaging, {
                        vapidKey: vapidKey,
                        serviceWorkerRegistration: registration,
                    });
                    
                    if (currentToken) {
                        console.log('[FCM] ========================================');
                        console.log('[FCM] FCM TOKEN RECEIVED AFTER PERMISSION GRANT!');
                        console.log('[FCM] Full token:', currentToken);
                        console.log('[FCM] Token length:', currentToken.length);
                        console.log('[FCM] ========================================');
                        setToken(currentToken);
                    } else {
                        console.warn('[FCM] No token received after permission grant');
                    }
                } catch (error) {
                    const errorMessage = error instanceof Error ? error.message : String(error);
                    console.error('[FCM] Error getting token after permission granted:', errorMessage, error);
                }
            } else {
                console.log('[FCM] Permission not granted or messaging not available', { permission, hasMessaging: !!messaging });
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
