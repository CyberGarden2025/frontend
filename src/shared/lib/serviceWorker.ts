export const registerServiceWorker = async (): Promise<ServiceWorkerRegistration | null> => {
    if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
        console.log('Service Worker not supported');
        return null;
    }

    try {
        const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js', {
            scope: '/',
        });
        console.log('Service Worker registered successfully:', registration);
        
        if (registration.active) {
            console.log('Service Worker is active');
        } else if (registration.installing) {
            console.log('Service Worker is installing');
            registration.installing.addEventListener('statechange', (event) => {
                console.log('Service Worker state changed:', (event.target as ServiceWorker).state);
            });
        } else if (registration.waiting) {
            console.log('Service Worker is waiting');
        }
        
        return registration;
    } catch (error) {
        console.error('Service Worker registration failed:', error);
        return null;
    }
};

