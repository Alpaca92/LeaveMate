import BottomNavigation from '@/components/bottom-navigation';
import Loading from '@/components/loading';
import { QUERY_KEYS, THEMES } from '@/config/config';
import Utils from '@/utils';
import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Outlet } from 'react-router-dom';
import RootStore from '@/stores/store';

export default function Layout() {
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

  useEffect(() => {
    Utils.setTheme(THEMES.DARK);
  }, []);

  if (!membersSuccess || !currentUserSuccess) return <Loading />;

  return (
    <>
      <Outlet />
      <BottomNavigation />
    </>
  );
}
