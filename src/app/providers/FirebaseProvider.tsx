import { useEffect, type FC, type ReactNode } from 'react';
import { registerServiceWorker } from '@shared/lib';

interface FirebaseProviderProps {
    children: ReactNode;
}

export const FirebaseProvider: FC<FirebaseProviderProps> = ({ children }) => {
    useEffect(() => {
        const initializeFirebase = async () => {
            await registerServiceWorker();
        };

        initializeFirebase();
    }, []);

    return <>{children}</>;
};

