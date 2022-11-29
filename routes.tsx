import React from 'react';
import type { RouteObject } from 'react-router-dom';
import HomePage, { loader as homePageLoader } from 'src/routes/embedded';
import SignupPage, {
  loader as signupPageLoader,
} from 'src/routes/embedded/signup';
import NotFound from 'src/routes/NotFound';
import Root from 'src/routes/root';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: 'embedded',
        element: <HomePage />,
        loader: homePageLoader,
        shouldRevalidate: ({ formAction }) => {
          return formAction != undefined;
        },
        errorElement: <NotFound />,
        children: [
          {
            index: true,
            element: <SignupPage />,
            loader: signupPageLoader,
            shouldRevalidate: ({ formAction }) => {
              return formAction != undefined;
            },
            errorElement: <NotFound />,
          },
        ],
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
];
