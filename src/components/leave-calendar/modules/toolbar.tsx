import {
  DateDispatchContext,
  DateStateContext,
} from '@/components/leave-calendar';
import { QUERY_KEYS } from '@/config/config';
import RootStore from '@/stores/store';
import { Holiday } from '@/types';
import Utils from '@/utils';
import { useQuery } from '@tanstack/react-query';
import { useContext, useState } from 'react';
import { NavigateAction, ToolbarProps } from 'react-big-calendar';

// FIXME: prev/next button 클릭 시 새로운 휴일 데이터 불러와서 store에 저장할 것
export default function Toolbar({ onNavigate }: ToolbarProps) {
  const [clickedButtonType, setClickedButtonType] = useState<
    'prev' | 'next' | 'today'
  >('today');
  const { addHolidays } = RootStore(({ addHolidays }) => ({ addHolidays }));
  const { year, month } = useContext(DateStateContext);
  const { data, refetch } = useQuery<Holiday>({
    queryKey: [QUERY_KEYS.HOLIDAYS, year, month],
    queryFn: () => Utils.fetchPublicHolidays({ year, month: month - 2 }),
    enabled: false,
  });
  const dispatch = useContext(DateDispatchContext);
  const navigate = (action: NavigateAction) => onNavigate(action);

  const onPreviousClick = () => {
    dispatch && dispatch({ type: 'prev' });
    setClickedButtonType('prev');
    refetch();
    navigate('PREV');
  };

  const onNextClick = () => {
    dispatch && dispatch({ type: 'next' });
    navigate('NEXT');
  };

  const onTodayClick = () => {
    dispatch && dispatch({ type: 'today' });
    navigate('TODAY');
  };

  return (
    <div className="flex items-center justify-center space-x-4 stroke-light-background-main stroke-2 text-2xl">
      <button
        onClick={onPreviousClick}
        className="w-6 rounded-full bg-slate-600 p-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className="w-full"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5L8.25 12l7.5-7.5"
          />
        </svg>
      </button>
      <p
        className="cursor-pointer"
        onClick={onTodayClick}
      >{`${year} / ${Utils.formatNumberToTwoDigits(month)}`}</p>
      <button
        onClick={onNextClick}
        className="w-6 rounded-full bg-slate-600 p-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className="w-full"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 4.5l7.5 7.5-7.5 7.5"
          />
        </svg>
      </button>
    </div>
  );
}
