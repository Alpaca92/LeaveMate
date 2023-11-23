import BottomNavigation from '@/components/bottom-navigation';
import Loading from '@/components/loading';
import { QUERY_KEYS } from '@/config/config';
import Utils from '@/utils';
import { useEffect } from 'react';
import { useQueries, useQuery } from '@tanstack/react-query';
import { Outlet } from 'react-router-dom';
import RootStore from '@/stores/store';

const TODAY = new Date();

export default function Layout() {
  const { addHolidays, setCurrentUser, setMembers, setRequests } = RootStore(
    ({ addHolidays, setCurrentUser, setMembers, setRequests }) => ({
      addHolidays,
      setCurrentUser,
      setMembers,
      setRequests,
    }),
  );

  const [
    { data: previousHolidays, isSuccess: previousHolidaysSuccess },
    { data: currentHolidays, isSuccess: currentHolidaysSuccess },
    { data: nextHolidays, isSuccess: nextHolidaysSuccess },
  ] = useQueries({
    // previous, current, next month
    queries: new Array(3).fill(0).map((_, i) => ({
      queryKey: [
        QUERY_KEYS.HOLIDAYS,
        TODAY.getFullYear(),
        TODAY.getMonth() + i,
      ],
      queryFn: () =>
        Utils.fetchPublicHolidays({
          year: TODAY.getFullYear(),
          month: TODAY.getMonth() + i,
        }),
    })),
  });
  const { isSuccess: currentUserSuccess, data: currentUserData } = useQuery({
    queryKey: [QUERY_KEYS.FIRESTORE, QUERY_KEYS.CURRENT_USER],
    queryFn: Utils.fetchCurrentUser,
  });
  const { isSuccess: membersSuccess, data: membersData } = useQuery({
    queryKey: [QUERY_KEYS.FIRESTORE, QUERY_KEYS.MEMBERS],
    queryFn: Utils.fetchMembers,
  });
  const { isSuccess: requestsSuccess, data: requestsData } = useQuery({
    queryKey: [QUERY_KEYS.FIRESTORE, QUERY_KEYS.REQUESTS],
    queryFn: Utils.fetchRequests,
  });

  useEffect(() => {
    if (
      previousHolidaysSuccess &&
      currentHolidaysSuccess &&
      nextHolidaysSuccess &&
      currentUserSuccess &&
      membersSuccess &&
      requestsSuccess &&
      previousHolidays &&
      currentHolidays &&
      nextHolidays &&
      currentUserData &&
      membersData &&
      requestsData
    ) {
      addHolidays(previousHolidays);
      addHolidays(currentHolidays);
      addHolidays(nextHolidays);
      setCurrentUser(currentUserData);
      setMembers(membersData);
      setRequests(requestsData);
    }
  }, [
    addHolidays,
    setCurrentUser,
    setMembers,
    setRequests,
    previousHolidaysSuccess,
    currentHolidaysSuccess,
    nextHolidaysSuccess,
    currentUserSuccess,
    membersSuccess,
    requestsSuccess,
    previousHolidays,
    currentHolidays,
    nextHolidays,
    currentUserData,
    membersData,
    requestsData,
  ]);

  if (!currentUserSuccess || !membersSuccess || !requestsSuccess)
    return <Loading />;

  return (
    <>
      <Outlet />
      <BottomNavigation />
    </>
  );
}
