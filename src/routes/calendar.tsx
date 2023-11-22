import { QUERY_KEYS } from '@/config/config';
import RootStore from '@/stores/store';
import { YearAndMonth } from '@/types';
import Utils from '@/utils';
import { useQuery } from '@tanstack/react-query';
import moment from 'moment';
import { useCallback, useState } from 'react';
import {
  Calendar as LeaveCalendar,
  DateHeaderProps,
  Event,
  EventProps,
  EventWrapperProps,
  HeaderProps,
  NavigateAction,
  ToolbarProps,
  momentLocalizer,
} from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useShallow } from 'zustand/react/shallow';

interface CustomEvent extends Event {
  meridiem?: 'am' | 'pm' | 'all';
}

const NOW = new Date();
const currentYearAndMonth = {
  year: NOW.getFullYear(),
  month: NOW.getMonth() + 1,
};

moment.locale('ko-KR');
const localizer = momentLocalizer(moment);

export default function Calendar() {
  const [selectedYearAndMonth, setSelectedYearAndMonth] =
    useState<YearAndMonth>(currentYearAndMonth);
  const myTeamMembers = RootStore(
    useShallow(({ currentUser, members }) =>
      members
        .filter((member) => currentUser.approver === member.approver)
        .map((member) => member.name),
    ),
  );
  const events: CustomEvent[] = RootStore(
    useShallow(({ requests }) =>
      requests
        .filter(
          (request) =>
            request.status === 'approve' &&
            new Date(request.startDate).getMonth() + 1 ===
              selectedYearAndMonth.month,
        )
        .map((request) => ({
          start: new Date(request.startDate),
          end: new Date(request.endDate),
          title: request.username,
          resource: {
            username: request.username,
          },
        })),
    ),
  );
  // FIXME: fetch가 늦게되는 경우가 있고, state가 변경 후 다시 렌더링이 되기 때문에 달력 날짜 색이 느리게 변하는 문제가 발생함
  const { data: holidays } = useQuery({
    queryKey: [
      QUERY_KEYS.HOLIDAYS,
      selectedYearAndMonth.year,
      selectedYearAndMonth.month,
    ],
    queryFn: () => Utils.fetchHolidays(selectedYearAndMonth),
  });

  // FIXME: 아래 예시코드들을 실제 코드로 변경하여 적용하기

  function Toolbar({ date, onNavigate }: ToolbarProps) {
    const [year, month] = [date.getFullYear(), date.getMonth() + 1];
    const navigate = (action: NavigateAction) => onNavigate(action);

    const onPreviousClick = () => {
      const newMonth = month - 1;

      if (!newMonth) {
        setSelectedYearAndMonth({ year: year - 1, month: 12 });
      } else {
        setSelectedYearAndMonth({ year, month: newMonth });
      }

      navigate('PREV');
    };

    const onNextClick = () => {
      const newMonth = month + 1;

      if (newMonth === 13) {
        setSelectedYearAndMonth({ year: year + 1, month: 1 });
      } else {
        setSelectedYearAndMonth({ year, month: newMonth });
      }

      navigate('NEXT');
    };

    const onTodayClick = () => {
      setSelectedYearAndMonth(currentYearAndMonth);
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

  const Month = {
    dateHeader: useCallback(
      ({ date }: DateHeaderProps) => {
        const [currentMonth, currentDate, currentDay] = [
          date.getMonth() + 1,
          date.getDate(),
          date.getDay(),
        ];
        const twoDigitDay = Utils.formatNumberToTwoDigits(currentDate);

        return (
          <span
            className={Utils.combineClassNames(
              currentDay === 0 ? 'text-red-500' : '',
              currentDay === 6 ? 'text-blue-500' : '',
              selectedYearAndMonth.month === currentMonth &&
                holidays?.includes(twoDigitDay)
                ? 'text-red-500'
                : '',
            )}
          >
            {currentDate}
          </span>
        );
      },
      [holidays, selectedYearAndMonth.month],
    ),
    header: ({ date }: HeaderProps) => {
      const dateList = ['일', '월', '화', '수', '목', '금', '토'];

      return <span>{dateList[date.getDay()]}</span>;
    },
    event: ({ title }: EventProps) => {
      return <span>{title}</span>;
    },
  };

  const EventWrapper = ({ event }: EventWrapperProps) => {
    const DEFAULT_COLOR = 'bg-gray-500';
    const COLORS = ['bg-red-500', 'bg-yellow-500', 'bg-blue-500'];

    const {
      title,
      resource: { username },
    } = event;
    const userIndex = myTeamMembers.indexOf(username);

    return (
      <div
        className={Utils.combineClassNames(
          userIndex === -1 ? DEFAULT_COLOR : COLORS[userIndex % COLORS.length],
        )}
      >
        {title}
      </div>
    );
  };

  return (
    <article className="flex w-4/5 flex-col items-center justify-center justify-self-center">
      <LeaveCalendar
        localizer={localizer}
        events={events}
        components={{
          toolbar: Toolbar,
          month: { ...Month },
          eventWrapper: EventWrapper,
        }}
        culture="ko-KR"
        className="!h-[80%] w-full"
      />
    </article>
  );
}
