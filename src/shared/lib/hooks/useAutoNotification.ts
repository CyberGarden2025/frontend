import { useEffect } from 'react';
import { useNotification } from './useNotification';

interface NotificationOption {
    title: string;
    body: string;
}

const NOTIFICATION_OPTIONS: NotificationOption[] = [
    {
        title: 'Финансовое уведомление',
        body: 'Доставка стала дороже. Расходы выросли на 15% за две недели',
    },
    {
        title: 'Анализ расходов',
        body: 'Вы потратили больше обычного на категорию "Продукты" в этом месяце',
    },
    {
        title: 'Рекомендация',
        body: 'Рекомендуем пересмотреть подписки. Вы можете сэкономить до 2000₽ в месяц',
    },
    {
        title: 'Лимит расходов',
        body: 'Вы приближаетесь к лимиту на категорию "Развлечения". Осталось 1500₽',
    },
    {
        title: 'Новое предложение',
        body: 'Обнаружена возможность сэкономить на регулярных платежах. Проверьте детали',
    },
    {
        title: 'Финансовая статистика',
        body: 'Ваши доходы в этом месяце превысили расходы на 25%. Отличный результат!',
    },
    {
        title: 'Напоминание',
        body: 'Не забудьте оплатить счета за коммунальные услуги до конца недели',
    },
    {
        title: 'Инвестиции',
        body: 'Рекомендуем рассмотреть возможность инвестирования свободных средств',
    },
];

export function useAutoNotification() {
    const notify = useNotification();

    useEffect(() => {
        const randomDelay = Math.floor(Math.random() * (30 - 10 + 1)) + 10;
        const randomNotification = NOTIFICATION_OPTIONS[Math.floor(Math.random() * NOTIFICATION_OPTIONS.length)];

        const timeoutId = setTimeout(() => {
            notify(randomNotification.title, {
                body: randomNotification.body,
                icon: '/favicon.ico',
                badge: '/favicon.ico',
            });
        }, randomDelay * 1000);

        return () => {
            clearTimeout(timeoutId);
        };
    }, [notify]);
}

