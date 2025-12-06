import { initializeApp, type FirebaseApp } from 'firebase/app';
import { getAnalytics, type Analytics } from 'firebase/analytics';
import { getMessaging, type Messaging } from 'firebase/messaging';

const firebaseConfig = {
    apiKey: 'AIzaSyCNCLkAI1YIU49B8n8Rd2UemWV8-MSJX4E',
    authDomain: 'test1-e175e.firebaseapp.com',
    projectId: 'test1-e175e',
    storageBucket: 'test1-e175e.firebasestorage.app',
    messagingSenderId: '281161870090',
    appId: '1:281161870090:web:8b837443dc044f7d3fe8f3',
    measurementId: 'G-H78FPSQZPB',
};

export const app: FirebaseApp = initializeApp(firebaseConfig);

export const analytics: Analytics | null = typeof window !== 'undefined' ? getAnalytics(app) : null;

export const getMessagingInstance = (): Messaging | null => {
    if (typeof window === 'undefined') {
        console.log('[Firebase Config] Window not available');
        return null;
    }
    
    try {
        const messaging = getMessaging(app);
        console.log('[Firebase Config] Messaging instance created');
        return messaging;
    } catch (error) {
        console.error('[Firebase Config] Error creating messaging instance:', error);
        return null;
    }
};

