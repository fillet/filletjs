import React, { Suspense } from 'react';
import { createBrowserRouter, RouteObject, RouterProvider } from 'react-router-dom';

import appConfig from '@config/App';

import ApplicationLayout from '@views/layouts/ApplicationLayout';

const HomeView = React.lazy(() => import('@views/home'));

const routes: RouteObject[] = [
  {
    path: '/',
    element: <ApplicationLayout />,
    children: [{ index: true, element: <HomeView /> }],
  },
];

const router = createBrowserRouter(routes, { basename: appConfig.path });

export default () => (
  <Suspense>
    <RouterProvider router={router} />
  </Suspense>
);
