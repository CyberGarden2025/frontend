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
    const notificationTitle = payload.notification?.title || 'Notification';
    const notificationOptions = {
        body: payload.notification?.body,
        icon: payload.notification?.icon || '/vite.svg',
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});

