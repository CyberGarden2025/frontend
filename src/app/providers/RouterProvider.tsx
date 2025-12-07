import { MainPage } from '@pages/MainPage';
import { FinancialSummaryPage } from '@pages/FinancialSummaryPage';
import { OperationsPage } from '@pages/OperationsPage';
import { ScanReceiptPage } from '@pages/ScanReceiptPage';
import { ChatPage } from '@pages/ChatPage';
import { FinancialForecastPage } from '@pages/FinancialForecastPage';
import type { FC } from 'react';
import { createBrowserRouter, RouterProvider as ReactRouter } from 'react-router-dom';
import { DetailedTransactionPage } from '@pages';


const routerFutureFlags = {
    v7_startTransition: true,
    v7_relativeSplatPath: true,
    v7_fetcherPersist: true,
    v7_normalizeFormMethod: true,
    v7_partialHydration: true,
    v7_skipActionErrorRevalidation: true,
} as any;

const router = createBrowserRouter(
    [
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
            ],
        },
    ],
    {
        future: routerFutureFlags,
    },
);

export const RouterProvider: FC = () => {
    return <ReactRouter router={router} future={routerFutureFlags} />;
};
