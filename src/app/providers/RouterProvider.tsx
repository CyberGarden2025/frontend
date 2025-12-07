import { MainPage } from '@pages/MainPage';
import { FinancialSummaryPage } from '@pages/FinancialSummaryPage';
import { OperationsPage } from '@pages/OperationsPage';
import { ScanReceiptPage } from '@pages/ScanReceiptPage';
import { ChatPage } from '@pages/ChatPage';
import { FinancialForecastPage } from '@pages/FinancialForecastPage';
import type { FC } from 'react';
import { createBrowserRouter, RouterProvider as ReactRouter, redirect } from 'react-router-dom';
import { CategoryPage, DetailedTransactionPage, NewLimitPage, NotificationsPage } from '@pages';
import { useAutoNotification } from '@shared/lib/hooks/useAutoNotification';

const routerFutureFlags = {
    v7_startTransition: true,
    v7_relativeSplatPath: true,
    v7_fetcherPersist: true,
    v7_normalizeFormMethod: true,
    v7_partialHydration: true,
    v7_skipActionErrorRevalidation: true,
} as unknown;

const router = createBrowserRouter([
    {
        path: '/',
        children: [
            {
                index: true,
                element: <MainPage />,
            },
            {
                path: '/financial-summary',
                element: <FinancialSummaryPage />,
            },
            {
                path: '/operations',
                children: [
                    {
                        element: <OperationsPage />,
                        index: true,
                    },
                    {
                        path: ':id',
                        element: <DetailedTransactionPage />,
                    },
                ],
            },
            {
                path: '/categories',
                children: [
                    {
                        element: <CategoryPage />,
                        index: true,
                    },
                    {
                        path: 'limit',
                        children: [
                            {
                                index: true,
                                loader: () => redirect('/categories'),
                            },
                            {
                                element: <NewLimitPage />,
                                path: 'new',
                            },
                        ],
                    },
                ],
            },
            {
                path: '/scan-receipt',
                element: <ScanReceiptPage />,
            },
            {
                path: '/chat',
                element: <ChatPage />,
            },
            {
                path: '/financial-forecast',
                element: <FinancialForecastPage />,
            },
            {
                path: '/notifications',
                element: <NotificationsPage />,
            },
        ],
    },
]);

export const RouterProvider: FC = () => {
    return <ReactRouter router={router} future={routerFutureFlags} />;
};


