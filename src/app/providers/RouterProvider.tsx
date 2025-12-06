import { MainPage } from '@pages/MainPage';
import { FinancialSummaryPage } from '@pages/FinancialSummaryPage';
import { OperationsPage } from '@pages/OperationsPage';
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
        ],
    },
  
]);

export const RouterProvider: FC = () => {
    return <ReactRouter router={router} />;
};
