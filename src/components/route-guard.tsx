import { PATH_NAME, PRIVATE_PATHS } from '@/config/config';
import { auth } from '@/config/firebase';
import { useMemo } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import 'react-toastify/ReactToastify.min.css';

export default function RouteGuard() {
  const user = auth.currentUser;
  const location = useLocation();
  const hasEnteredPrivatePath = useMemo(
    () => PRIVATE_PATHS.includes(location.pathname),
    [location],
  );

  let children;

  if (user) {
    children = hasEnteredPrivatePath ? (
      <Outlet />
    ) : (
      <Navigate to={PATH_NAME.HOME} />
    );
  } else {
    children = hasEnteredPrivatePath ? (
      <Navigate to={PATH_NAME.LOGIN} />
    ) : (
      <Outlet />
    );
  }

  return (
    <main
      className={`${
        hasEnteredPrivatePath ? 'grid-rows-[90%_10%]' : ''
      } grid h-screen bg-light-background-main text-light-text-main dark:bg-dark-background-main dark:text-dark-text-main`}
    >
      {children}
    </main>
  );
}
