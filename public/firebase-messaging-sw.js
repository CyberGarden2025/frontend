importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js');

const firebaseConfig = {
    apiKey: 'AIzaSyCNCLkAI1YIU49B8n8Rd2UemWV8-MSJX4E',
    authDomain: 'test1-e175e.firebaseapp.com',
    projectId: 'test1-e175e',
    storageBucket: 'test1-e175e.firebasestorage.app',
    messagingSenderId: '281161870090',
    appId: '1:281161870090:web:8b837443dc044f7d3fe8f3',
    measurementId: 'G-H78FPSQZPB',
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log('Background message received:', payload);
    const notificationTitle = payload.notification?.title || 'Notification';
    const notificationOptions = {
        body: payload.notification?.body,
        icon: payload.notification?.icon || '/vite.svg',
        badge: '/vite.svg',
        tag: 'firebase-notification',
        requireInteraction: false,
    };

    return self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener('notificationclick', (event) => {
    console.log('Notification clicked:', event);
    event.notification.close();
    
    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
            for (const client of clientList) {
                if (client.url === '/' && 'focus' in client) {
                    return client.focus();
                }
            }
            if (clients.openWindow) {
                return clients.openWindow('/');
            }
        })
    );
});

