export const registerServiceWorker = async (): Promise<ServiceWorkerRegistration | null> => {
    if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
        return null;
    }

    try {
        const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js', {
            scope: '/',
        });
        return registration;
    } catch (error) {
        console.error('Service Worker registration failed:', error);
        return null;
    }
};

