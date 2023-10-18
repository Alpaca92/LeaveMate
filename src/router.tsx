import Layout from '@/components/layout';
import Calendar from '@/routes/calendar';
import Home from '@/routes/home';
import Login from '@/routes/login';
import Profile from '@/routes/profile';
import Signup from '@/routes/signup';
import { createBrowserRouter } from 'react-router-dom';

const PATH_NAME = {
  LOGIN: '/login',
  SIGNUP: '/signup',
  HOME: '/',
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
        path: PATH_NAME.LOGIN,
        element: <Login />,
      },
      {
        path: PATH_NAME.SIGNUP,
        element: <Signup />,
      },
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
]);

export { PATH_NAME };
export default router;
