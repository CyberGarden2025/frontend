import { MainPage } from '@pages/MainPage';
import { FinancialSummaryPage } from '@pages/FinancialSummaryPage';
import { OperationsPage } from '@pages/OperationsPage';
import { ScanReceiptPage } from '@pages/ScanReceiptPage';
import { ChatPage } from '@pages/ChatPage';
import { FinancialForecastPage } from '@pages/FinancialForecastPage';
import type { FC } from 'react';
import { createBrowserRouter, RouterProvider as ReactRouter } from 'react-router-dom';


const router = createBrowserRouter([
    {
        path: '/',
        children: [
            {
                index: true,
                element: <MainPage/>
                
            },
            {
                path: '/financial-summary',
                element: <FinancialSummaryPage/>
            },
            {
                path: '/operations',
                element: <OperationsPage/>
            },
            {
                path: '/scan-receipt',
                element: <ScanReceiptPage/>
            },
            {
                path: '/chat',
                element: <ChatPage/>
            },
            {
                path: '/financial-forecast',
                element: <FinancialForecastPage/>
            },
        ],
    },
  
]);

export const RouterProvider: FC = () => {
    return <ReactRouter router={router} />;
};
