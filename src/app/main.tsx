import '@styles/main.css';

import { store } from '@shared/store';
import '@shared/config/firebase';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import { FirebaseProvider } from './providers/FirebaseProvider';
import { RouterProvider } from './providers/RouterProvider';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Provider store={store}>
            <FirebaseProvider>
                <RouterProvider />
            </FirebaseProvider>
        </Provider>
    </StrictMode>,
);
