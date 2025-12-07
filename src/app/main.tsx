import '@styles/main.css';

import '@shared/config/firebase';
import { initSentry, triggerSentryTestError } from '@shared/config/sentry';
import { store } from '@shared/store';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import { FirebaseProvider } from './providers/FirebaseProvider';
import { RouterProvider } from './providers/RouterProvider';
import { KeycloakProvider } from '@shared/lib';

initSentry();

if (typeof window !== 'undefined') {
    (window as typeof window & {
        triggerSentryTestError?: () => void;
        myUndefinedFunction?: () => void;
    }).triggerSentryTestError = triggerSentryTestError;

    // Expose the Sentry test trigger on the legacy name used in the snippet.
    (window as typeof window & { myUndefinedFunction?: () => void }).myUndefinedFunction =
        triggerSentryTestError;
}

if (import.meta.env.DEV) {
    triggerSentryTestError();
}

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <KeycloakProvider>
            <Provider store={store}>
                <FirebaseProvider>
                    <RouterProvider />
                </FirebaseProvider>
            </Provider>
        </KeycloakProvider>
    </StrictMode>,
);
