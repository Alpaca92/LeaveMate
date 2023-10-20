import { PATH_NAME, PRIVATE_PATHS } from '@/config/config';
import { auth } from '@/config/firebase';
import { useMemo } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface RouteGuardProps {
  children: React.ReactNode;
}

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
