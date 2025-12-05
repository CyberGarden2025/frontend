import { MainPage } from '@pages/MainPage';
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
        ],
    },
  
]);

export const RouterProvider: FC = () => {
    return <ReactRouter router={router} />;
};
