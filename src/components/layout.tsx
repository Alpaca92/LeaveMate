import BottomNavigation from '@/components/bottom-navigation';
import { PRIVATE_PATHS } from '@/config/config';
import { useMemo } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

export default function Layout() {
  const location = useLocation();
  const hasEnteredPrivatePath = useMemo(
    () => PRIVATE_PATHS.includes(location.pathname),
    [location],
  );

  return (
    <>
      <Outlet />
      {hasEnteredPrivatePath ? <BottomNavigation /> : null}
    </>
  );
}
