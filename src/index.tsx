import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import App from './components/app/app';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';

const container = document.getElementById('root') as HTMLElement;
const root = ReactDOMClient.createRoot(container!);

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <ConstructorPage />,
        errorElement: <NotFound404 />
      },
      {
        path: '/feed',
        element: <Feed />
      },
      {
        path: '/login',
        element: <Login />
      },
      { path: '/register', element: <Register /> },
      {
        path: '/forgot-password',
        element: <ForgotPassword />
      },
      { path: '/reset-password', element: <ResetPassword /> },
      {
        path: '/profile',
        element: <Profile />
      },
      {
        path: '/profile/orders',
        element: <ProfileOrders />
      },
      { path: '*', element: <NotFound404 /> }
    ]
  }
]);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
