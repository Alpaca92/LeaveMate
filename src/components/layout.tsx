import BottomNavigation from '@/components/bottom-navigation';
import RouteGuard from '@/components/route-guard';
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
    <RouteGuard>
      <main
        className={`${
          hasEnteredPrivatePath ? 'grid-rows-[90%_10%]' : ''
        } grid h-screen bg-light-background-main  text-light-text-main dark:bg-dark-background-main dark:text-dark-text-main`}
      >
        <Outlet />
        {hasEnteredPrivatePath ? <BottomNavigation /> : null}
      </main>
    </RouteGuard>
  );
}
