import Layout from '@/components/layout';
import Calendar from '@/routes/calendar';
import Home from '@/routes/home';
import Profile from '@/routes/profile';
import Requests from '@/routes/requests';
import { createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '',
        element: <Home />,
      },
      {
        path: 'requests',
        element: <Requests />,
      },
      {
        path: 'calendar',
        element: <Calendar />,
      },
      {
        path: 'profile',
        element: <Profile />,
      },
    ],
  },
]);

export default router;
