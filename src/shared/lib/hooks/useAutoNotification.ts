import { useEffect } from 'react';
import { useNotification } from './useNotification';

export function useAutoNotification() {
    const notify = useNotification();

    useEffect(() => {
        const randomDelay = Math.floor(Math.random() * (30 - 10 + 1)) + 10;

        const timeoutId = setTimeout(() => {
            notify('Финансовое уведомление', {
                body: 'Доставка стала дороже. Расходы выросли на 15% за две недели',
                icon: '/favicon.ico',
                badge: '/favicon.ico',
            });
        }, randomDelay * 1000);

        return () => {
            clearTimeout(timeoutId);
        };
    }, [notify]);
}

