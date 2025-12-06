console.log('[SW] Service Worker script loaded');

importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js');

console.log('[SW] Firebase scripts loaded');

const firebaseConfig = {
    apiKey: 'AIzaSyCNCLkAI1YIU49B8n8Rd2UemWV8-MSJX4E',
    authDomain: 'test1-e175e.firebaseapp.com',
    projectId: 'test1-e175e',
    storageBucket: 'test1-e175e.firebasestorage.app',
    messagingSenderId: '281161870090',
    appId: '1:281161870090:web:8b837443dc044f7d3fe8f3',
    measurementId: 'G-H78FPSQZPB',
};

console.log('[SW] Initializing Firebase with config:', firebaseConfig);

try {
    const app = firebase.initializeApp(firebaseConfig);
    console.log('[SW] Firebase app initialized:', app);
    
    const messaging = firebase.messaging();
    console.log('[SW] Firebase Messaging instance created:', messaging);
    
    messaging.onBackgroundMessage((payload) => {
        console.log('[SW] ========== BACKGROUND MESSAGE RECEIVED ==========');
        console.log('[SW] Full payload:', JSON.stringify(payload, null, 2));
        console.log('[SW] Payload notification:', payload.notification);
        console.log('[SW] Payload data:', payload.data);
        console.log('[SW] Payload from:', payload.from);
        console.log('[SW] Payload collapseKey:', payload.collapseKey);
        
        const notificationTitle = payload.notification?.title || payload.data?.title || 'Notification';
        const notificationBody = payload.notification?.body || payload.data?.body || '';
        const notificationIcon = payload.notification?.icon || payload.data?.icon || '/vite.svg';
        
        const notificationOptions = {
            body: notificationBody,
            icon: notificationIcon,
            badge: '/vite.svg',
            tag: 'firebase-notification',
            requireInteraction: false,
            data: payload.data || {},
        };

        console.log('[SW] Preparing to show notification:', notificationTitle);
        console.log('[SW] Notification options:', notificationOptions);
        
        return self.registration.showNotification(notificationTitle, notificationOptions)
            .then(() => {
                console.log('[SW] ✅ Notification shown successfully');
            })
            .catch((error) => {
                console.error('[SW] ❌ Error showing notification:', error);
                console.error('[SW] Error details:', error.message, error.stack);
            });
    });
    
    console.log('[SW] ✅ onBackgroundMessage handler registered');
    
    messaging.onMessage((payload) => {
        console.log('[SW] ========== FOREGROUND MESSAGE RECEIVED IN SW ==========');
        console.log('[SW] This should not happen - foreground messages are handled in the app');
        console.log('[SW] Payload:', payload);
    });
    
    console.log('[SW] ✅ Firebase Messaging fully initialized and ready');
} catch (error) {
    console.error('[SW] ❌ Error initializing Firebase:', error);
    console.error('[SW] Error details:', error.message, error.stack);
}

self.addEventListener('notificationclick', (event) => {
    console.log('[SW] Notification clicked:', event);
    console.log('[SW] Notification data:', event.notification.data);
    event.notification.close();
    
    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
            console.log('[SW] Found clients:', clientList.length);
            for (const client of clientList) {
                if (client.url === '/' && 'focus' in client) {
                    console.log('[SW] Focusing existing client');
                    return client.focus();
                }
            }
            if (clients.openWindow) {
                console.log('[SW] Opening new window');
                return clients.openWindow('/');
            }
        })
    );
});

self.addEventListener('install', (event) => {
    console.log('[SW] Service Worker installing');
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    console.log('[SW] Service Worker activating');
    event.waitUntil(self.clients.claim());
    console.log('[SW] Service Worker activated and claimed clients');
});

self.addEventListener('message', (event) => {
    console.log('[SW] Message received from client:', event.data);
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});

self.addEventListener('push', (event) => {
    console.log('[SW] ========== PUSH EVENT RECEIVED ==========');
    console.log('[SW] Push event data:', event.data);
    
    if (event.data) {
        try {
            const data = event.data.json();
            console.log('[SW] Parsed push data:', data);
        } catch (e) {
            const text = event.data.text();
            console.log('[SW] Push data as text:', text);
        }
    }
    
    console.log('[SW] Note: Firebase Messaging handles push events automatically');
});

