import { useState } from 'react';
import { useFirebaseNotifications } from '@shared/hooks';
import { ExpenseFilters } from '@entities/expense';
import { Button } from '@shared/ui';

export const MainPage = () => {
    const { token, permission, requestPermission } = useFirebaseNotifications();
    const [copied, setCopied] = useState(false);
    const [isOpen, setIsOpen] = useState(false)

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
        </div>
    );
};
