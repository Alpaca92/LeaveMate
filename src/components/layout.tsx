import BottomNavigation from '@/components/bottom-navigation';
import { PRIVATE_PATHS } from '@/config/config';
import { auth } from '@/config/firebase';
import RootStore from '@/stores/store';
import { useMemo } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useShallow } from 'zustand/react/shallow';

export default function Layout() {
  const user = auth.currentUser;
  const location = useLocation();
  const hasEnteredPrivatePath = useMemo(
    () => PRIVATE_PATHS.includes(location.pathname),
    [location],
  );
  const members = RootStore(
    useShallow((state) =>
      state.members.filter((member) => member.name !== user?.displayName),
    ),
  );

  return (
    <>
      <Outlet />
      {hasEnteredPrivatePath ? <BottomNavigation /> : null}
    </>
  );
}
