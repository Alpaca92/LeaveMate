import { auth } from '@/config/firebase';
import { PATH_NAME } from '@/router';
import { Navigate, useLocation } from 'react-router-dom';

interface ProtectRoutesProps {
  children: React.ReactNode;
}

export default function ProtectRoutes({ children }: ProtectRoutesProps) {
  const PrivateRoutes = [PATH_NAME.HOME, PATH_NAME.CALENDAR, PATH_NAME.PROFILE];
  const publicRoutes = [PATH_NAME.LOGIN, PATH_NAME.SIGNUP];

  const user = auth.currentUser;
  const location = useLocation();

  console.log(user);

  if (!user) {
    for (const route of PrivateRoutes) {
      if (route === location.pathname) return <Navigate to="/login" />;
    }
  } else {
    for (const route of publicRoutes) {
      if (route === location.pathname) return <Navigate to="/" />;
    }
  }

  return children;
}
