import BottomNavigation from '@/components/bottom-navigation';
import { PRIVATE_PATHS } from '@/config/config';
import RootStore from '@/stores/store';
import { useEffect, useMemo } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

export default function Layout() {
  const location = useLocation();
  const hasEnteredPrivatePath = useMemo(
    () => PRIVATE_PATHS.includes(location.pathname),
    [location],
  );
  const setMembers = RootStore((state) => state.setMembers);
  const setCurrentUser = RootStore((state) => state.setCurrentUser);

  useEffect(() => {
    setMembers();
    setCurrentUser();
  }, [setMembers, setCurrentUser]);

  return (
    <>
      <Outlet />
      {hasEnteredPrivatePath ? <BottomNavigation /> : null}
    </>
  );
}
