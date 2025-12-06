export const registerServiceWorker = async (): Promise<ServiceWorkerRegistration | null> => {
    if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
        console.log('[Service Worker] Service Worker not supported');
        return null;
    }

    try {
        console.log('[Service Worker] Registering Service Worker...');
        
        const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js', {
            scope: '/',
        });
        console.log('[Service Worker] Service Worker registered successfully:', registration);
        
        if (registration.installing) {
            console.log('[Service Worker] Service Worker is installing');
            registration.installing.addEventListener('statechange', (event) => {
                const worker = event.target as ServiceWorker;
                console.log('[Service Worker] State changed:', worker.state);
                if (worker.state === 'installed' && navigator.serviceWorker.controller) {
                    console.log('[Service Worker] New Service Worker installed, reloading...');
                }
            });
        } else if (registration.waiting) {
            console.log('[Service Worker] Service Worker is waiting');
            console.log('[Service Worker] Activating waiting Service Worker...');
            registration.waiting.postMessage({ type: 'SKIP_WAITING' });
        } else if (registration.active) {
            console.log('[Service Worker] Service Worker is active');
        }
        
        registration.addEventListener('updatefound', () => {
            console.log('[Service Worker] Update found, new Service Worker installing...');
            const newWorker = registration.installing;
            if (newWorker) {
                newWorker.addEventListener('statechange', () => {
                    if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                        console.log('[Service Worker] New Service Worker ready, reloading...');
                        window.location.reload();
                    }
                });
            }
        });
        
        navigator.serviceWorker.addEventListener('controllerchange', () => {
            console.log('[Service Worker] Controller changed, reloading...');
            window.location.reload();
        });
        
        return registration;
    } catch (error) {
        console.error('[Service Worker] Service Worker registration failed:', error);
        if (error instanceof Error) {
            console.error('[Service Worker] Error details:', error.message, error.stack);
        }
        return null;
    }
};

