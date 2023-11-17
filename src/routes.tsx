/* eslint-disable import/prefer-default-export */
import { createBrowserRouter } from 'react-router-dom';

import Root from './routes/Root/Root';
import Error from './components/Error';
import Favorite from './components/Favorites/Favorites';

import Home from './routes/Home';
import Recipe from './routes/Recipe';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <Error />,

    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/recipe/:slug',
        element: <Recipe />,
      },
      {
        path: '/favorites',
        element: <Favorite />,
      },
    ],
  },
]);
