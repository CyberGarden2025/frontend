import { useState, useEffect } from 'react';
import { useFirebaseNotifications } from '@shared/hooks';
import { ExpenseFilters } from '@entities/expense';
import { Button } from '@shared/ui';
import { TransactionsListWidget } from '@widgets';
import type { Transaction } from '@widgets';
import { KanbanIcon } from '@shared/ui/icons';

export const MainPage = () => {
    const userId = Number(import.meta.env.VITE_DEFAULT_USER_ID);
    const resolvedUserId = Number.isNaN(userId) ? undefined : userId;

    const { token, permission, requestPermission, lastNotification } = useFirebaseNotifications({
        userId: resolvedUserId,
    });
    const [copied, setCopied] = useState(false);

    const [isOpen, setIsOpen] = useState(false)
    
    useEffect(() => {
        const timer = setTimeout(() => {
            requestPermission();
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

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
            {lastNotification && (
                <div
                    style={{
                        marginTop: '20px',
                        padding: '12px',
                        border: '1px solid #e0e0e0',
                        borderRadius: '8px',
                        background: '#fdfdfd',
                    }}
                >
                    <p style={{ margin: 0, fontWeight: 600 }}>Last notification (in-app)</p>
                    <p style={{ margin: '4px 0' }}>{lastNotification.title}</p>
                    {lastNotification.body && <p style={{ margin: '4px 0' }}>{lastNotification.body}</p>}
                    {lastNotification.data && (
                        <div style={{ fontSize: '13px', color: '#444' }}>
                            <p style={{ margin: '4px 0' }}>Data:</p>
                            <ul style={{ margin: 0, paddingLeft: '16px' }}>
                                {Object.entries(lastNotification.data).map(([key, value]) => (
                                    <li key={key}>
                                        {key}: {String(value)}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};
