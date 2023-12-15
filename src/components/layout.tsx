import BottomNavigation from '@/components/bottom-navigation';
import Loading from '@/components/loading';
import { QUERY_KEYS } from '@/config/config';
import Utils from '@/utils';
import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Outlet } from 'react-router-dom';
import RootStore from '@/stores/store';

export default function Layout() {
  const { addHolidays, setCurrentUser, setMembers, setRequests } = RootStore(
    ({ addHolidays, setCurrentUser, setMembers, setRequests }) => ({
      addHolidays,
      setCurrentUser,
      setMembers,
      setRequests,
    }),
  );
  // const { isSuccess: currentUserSuccess, data: currentUserData } = useQuery({
  //   queryKey: [QUERY_KEYS.FIRESTORE, QUERY_KEYS.CURRENT_USER],
  //   queryFn: Utils.fetchCurrentUser,
  // });
  // const { isSuccess: membersSuccess, data: membersData } = useQuery({
  //   queryKey: [QUERY_KEYS.FIRESTORE, QUERY_KEYS.MEMBERS],
  //   queryFn: Utils.fetchMembers,
  // });
  // const { isSuccess: requestsSuccess, data: requestsData } = useQuery({
  //   queryKey: [QUERY_KEYS.FIRESTORE, QUERY_KEYS.REQUESTS],
  //   queryFn: Utils.fetchRequests,
  // });

  // useEffect(() => {
  //   if (
  //     currentUserSuccess &&
  //     membersSuccess &&
  //     requestsSuccess &&
  //     currentUserData &&
  //     membersData &&
  //     requestsData
  //   ) {
  //     setCurrentUser(currentUserData);
  //     setMembers(membersData);
  //     setRequests(requestsData);
  //   }
  // }, [
  //   addHolidays,
  //   setCurrentUser,
  //   setMembers,
  //   setRequests,
  //   currentUserSuccess,
  //   membersSuccess,
  //   requestsSuccess,
  //   currentUserData,
  //   membersData,
  //   requestsData,
  // ]);

  // if (!currentUserSuccess || !membersSuccess || !requestsSuccess)
  //   return <Loading />;

  return (
    <>
      <Outlet />
      <BottomNavigation />
    </>
  );
}
