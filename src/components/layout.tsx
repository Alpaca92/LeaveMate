import BottomNavigation from '@/components/bottom-navigation';
import Loading from '@/components/loading';
import { PRIVATE_PATHS, QUERY_KEYS } from '@/config/config';
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
    queryKey: [QUERY_KEYS.FIRESTORE, QUERY_KEYS.MEMBERS],
    queryFn: Utils.fetchMembers,
  });
  const { isSuccess: currentUserSuccess, data: currentUserData } = useQuery({
    queryKey: [QUERY_KEYS.FIRESTORE, QUERY_KEYS.CURRENT_USER],
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

  if (!membersSuccess || !currentUserSuccess) return <Loading />;

  return (
    <>
      {<Outlet />}
      {hasEnteredPrivatePath ? <BottomNavigation /> : null}
    </>
  );
}
