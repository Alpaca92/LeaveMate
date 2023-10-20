import { PATH_NAME } from '@/config/config';
import { auth } from '@/config/firebase';
import { useMemo } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface RouteGuardProps {
  children: React.ReactNode;
}

const PRIVATE_PATHS = [PATH_NAME.HOME, PATH_NAME.CALENDAR, PATH_NAME.PROFILE];

export default function RouteGuard({ children }: RouteGuardProps) {
  const user = auth.currentUser;
  const location = useLocation();
  const hasEnteredPrivatePath = useMemo(
    () => PRIVATE_PATHS.includes(location.pathname),
    [location],
  );

  if (user) {
    console.log('have user');

    return hasEnteredPrivatePath ? children : <Navigate to={PATH_NAME.HOME} />;
  } else {
    console.log('no user');

    return hasEnteredPrivatePath ? <Navigate to={PATH_NAME.LOGIN} /> : children;
  }
}
