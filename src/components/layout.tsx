import BottomNavigation from '@/components/bottom-navigation';
import { PRIVATE_PATHS } from '@/config/config';
import RootStore from '@/stores/store';
import Utils from '@/utils';
import { useQuery } from '@tanstack/react-query';
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

  const { isSuccess: membersSuccess, data: membersData } = useQuery({
    queryKey: ['firestore', 'members'],
    queryFn: Utils.fetchMembers,
  });
  const { isSuccess: currentUserSuccess, data: currentUserData } = useQuery({
    queryKey: ['firestore', 'currentUser'],
    queryFn: Utils.fetchCurrentUser,
  });

  useEffect(() => {
    if (membersSuccess) {
      setMembers(membersData);
    }

    if (currentUserSuccess) {
      setCurrentUser(currentUserData);
    }
  }, [
    membersSuccess,
    membersData,
    setMembers,
    currentUserSuccess,
    currentUserData,
    setCurrentUser,
  ]);

  return (
    <>
      <Outlet />
      {hasEnteredPrivatePath ? <BottomNavigation /> : null}
    </>
  );
}
