import BottomNavigation from '@/components/bottom-navigation';
import Loading from '@/components/loading';
import { QUERY_KEYS } from '@/config/config';
import Utils from '@/utils';
import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Outlet } from 'react-router-dom';
import RootStore from '@/stores/store';

export default function Layout() {
  const { setMembers, setCurrentUser, setRequests } = RootStore(
    ({ setMembers, setCurrentUser, setRequests }) => ({
      setMembers,
      setCurrentUser,
      setRequests,
    }),
  );

  const { isSuccess: membersSuccess, data: membersData } = useQuery({
    queryKey: [QUERY_KEYS.FIRESTORE, QUERY_KEYS.MEMBERS],
    queryFn: Utils.fetchMembers,
  });
  const { isSuccess: currentUserSuccess, data: currentUserData } = useQuery({
    queryKey: [QUERY_KEYS.FIRESTORE, QUERY_KEYS.CURRENT_USER],
    queryFn: Utils.fetchCurrentUser,
  });
  const { isSuccess: requestsSuccess, data: requestsData } = useQuery({
    queryKey: [QUERY_KEYS.FIRESTORE, QUERY_KEYS.REQUESTS],
    queryFn: Utils.fetchRequests,
  });

  useEffect(() => {
    if (membersSuccess) {
      setMembers(membersData);
    }

    if (currentUserSuccess) {
      setCurrentUser(currentUserData);
    }

    if (requestsSuccess) {
      setRequests(requestsData);
    }
  }, [
    membersSuccess,
    membersData,
    setMembers,
    currentUserSuccess,
    currentUserData,
    setCurrentUser,
    requestsSuccess,
    requestsData,
    setRequests,
  ]);

  if (!membersSuccess || !currentUserSuccess || !requestsSuccess)
    return <Loading />;

  return (
    <>
      <Outlet />
      <BottomNavigation />
    </>
  );
}
