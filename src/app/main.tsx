import '@styles/main.css';

import { store } from '@shared/store';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import { RouterProvider } from './providers/RouterProvider';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Provider store={store}>
            <RouterProvider />
        </Provider>
    </StrictMode>,
);
