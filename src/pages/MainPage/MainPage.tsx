import { useState } from 'react';
import { useFirebaseNotifications } from '@shared/hooks';
import { ExpenseFilters } from '@entities/expense';
import { Button } from '@shared/ui';
import { TransactionsListWidget } from '@widgets';
import type { Transaction } from '@widgets';
import { KanbanIcon } from '@shared/ui/icons';

export const MainPage = () => {
    const { token, permission, requestPermission } = useFirebaseNotifications();
    const [copied, setCopied] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const transactions: Transaction[] = [
        {
            id: '1',
            operationLabel: 'Перевод между счетами',
            value: 2000,
            category: 'Переводы',
            date: new Date(),
            icon: <KanbanIcon />,
            onClick: () => console.log('Transaction 1 clicked'),
        },
        {
            id: '2',
            operationLabel: 'Покупка продуктов',
            value: 2500,
            category: 'Продукты',
            date: new Date(),
            icon: <KanbanIcon />,
            onClick: () => console.log('Transaction 2 clicked'),
        },
        {
            id: '3',
            operationLabel: 'Оплата интернета',
            value: 500,
            category: 'Коммунальные',
            date: new Date(),
            icon: <KanbanIcon />,
            onClick: () => console.log('Transaction 3 clicked'),
        },
        {
            id: '4',
            operationLabel: 'Зарплата',
            value: 50000,
            category: 'Доходы',
            date: new Date(Date.now() - 86400000),
            icon: <KanbanIcon />,
            onClick: () => console.log('Transaction 4 clicked'),
        },
        {
            id: '5',
            operationLabel: 'Покупка одежды',
            value: 3500,
            category: 'Одежда',
            date: new Date(Date.now() - 86400000),
            icon: <KanbanIcon />,
            onClick: () => console.log('Transaction 5 clicked'),
        },
    ];

    const copyToken = async () => {
        if (token) {
            await navigator.clipboard.writeText(token);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <div>
            <h1>Main Page</h1>
            <Button onClick={() => setIsOpen(!isOpen)} label={'123'}/>
            <ExpenseFilters isOpen={isOpen} setIsOpen={setIsOpen}/>

            <div style={{ marginTop: '20px', maxWidth: '600px' }}>
                <TransactionsListWidget transactions={transactions} />
            </div>

            {permission === 'default' && (
                <div>
                    <p>Click the button to enable notifications</p>
                    <button onClick={requestPermission}>Request Notification Permission</button>
                </div>
            )}
            {permission === 'granted' && token && (
                <div>
                    <p>Notifications enabled</p>
                    <div>
                        <p>
                            <strong>FCM Token:</strong>
                        </p>
                        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                            <code
                                style={{
                                    padding: '8px',
                                    backgroundColor: '#f5f5f5',
                                    borderRadius: '4px',
                                    wordBreak: 'break-all',
                                    maxWidth: '600px',
                                }}
                            >
                                {token}
                            </code>
                            <button onClick={copyToken}>{copied ? 'Copied!' : 'Copy'}</button>
                        </div>
                        <p style={{ marginTop: '10px', fontSize: '14px', color: '#666' }}>
                            Use this token to send test notifications (see instructions below)
                        </p>
                    </div>
                </div>
            )}
            {permission === 'granted' && !token && (
                <div>
                    <p>Notifications enabled, but token is not available yet</p>
                    <p>Make sure VITE_FIREBASE_VAPID_KEY is set in .env file</p>
                </div>
            )}
            {permission === 'denied' && (
                <div>
                    <p>Notifications are blocked by browser</p>
                    <p>Please enable notifications in your browser settings for this site</p>
                </div>
            )}
        </div>
    );
};
