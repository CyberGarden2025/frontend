import { useEffect, type FC, type ReactNode } from 'react';
import { registerServiceWorker } from '@shared/lib';
import { useFirebaseNotifications } from '@shared/hooks';

interface FirebaseProviderProps {
    children: ReactNode;
}

const FirebaseProviderInner: FC<FirebaseProviderProps> = ({ children }) => {
    useFirebaseNotifications();

    return <>{children}</>;
};

export const FirebaseProvider: FC<FirebaseProviderProps> = ({ children }) => {
    useEffect(() => {
        const initializeFirebase = async () => {
            await registerServiceWorker();
        };

        initializeFirebase();
    }, []);

    return (
        <FirebaseProviderInner>
            {children}
        </FirebaseProviderInner>
    );
};

