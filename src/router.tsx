import { createBrowserRouter } from 'react-router-dom';
import { PATH_NAME } from '@/config/config';
import Layout from '@/components/layout';
import Login from '@/routes/login';
import Profile from '@/routes/profile';
import Signup from '@/routes/signup';
import Home from '@/routes/home';
import Calendar from '@/routes/calendar';
import RouteGuard from '@/components/route-guard';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RouteGuard />,
    children: [
      {
        path: '/',
        element: <Layout />,
        children: [
          {
            path: PATH_NAME.HOME,
            element: <Home />,
          },
          {
            path: PATH_NAME.CALENDAR,
            element: <Calendar />,
          },
          {
            path: PATH_NAME.PROFILE,
            element: <Profile />,
          },
        ],
      },
      {
        path: PATH_NAME.LOGIN,
        element: <Login />,
      },
      {
        path: PATH_NAME.SIGNUP,
        element: <Signup />,
      },
    ],
  },
]);

export default router;
