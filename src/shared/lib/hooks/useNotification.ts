import { useCallback } from 'react';

export function useNotification() {
    const notify = useCallback((title: string, options: NotificationOptions = {}) => {
        if (!('Notification' in window)) {
            console.error('Ваш браузер не поддерживает Notification API');
            return;
        }

        if (Notification.permission === 'granted') {
            new Notification(title, options);
        } else if (Notification.permission !== 'denied') {
            Notification.requestPermission().then((permission) => {
                if (permission === 'granted') {
                    new Notification(title, options);
                }
            });
        }
    }, []);

    return notify;
}

