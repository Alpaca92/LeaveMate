import Layout from '@/components/layout';
import Calendar from '@/routes/calendar';
import Home from '@/routes/home';
import Profile from '@/routes/profile';
import Requests from '@/routes/requests';
import { createBrowserRouter } from 'react-router-dom';

const PATH_NAME = {
  HOME: '/',
  REQUESTS: '/requests',
  CALENDAR: '/calendar',
  PROFILE: '/profile',
};

Object.freeze(PATH_NAME);

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: PATH_NAME.HOME,
        element: <Home />,
      },
      {
        path: PATH_NAME.REQUESTS,
        element: <Requests />,
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
]);

export { PATH_NAME };
export default router;
