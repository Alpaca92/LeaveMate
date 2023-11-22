import { YearAndMonth } from '@/types';
import Utils from '@/utils';
import moment from 'moment';
import { useCallback, useEffect, useState } from 'react';
import {
  DateHeaderProps,
  DayPropGetter,
  Event,
  EventPropGetter,
  EventProps,
  HeaderProps,
  Calendar as LeaveCalendar,
  NavigateAction,
  ToolbarProps,
  momentLocalizer,
} from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

interface CustomEvent extends Event {
  meridiem: 'am' | 'pm' | 'all';
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
  const [holidays, setHolidays] = useState<string[]>([]);

  useEffect(() => {
    Utils.getHolidays(selectedYearAndMonth).then((holidays) => {
      setHolidays(holidays);
    });
  }, [selectedYearAndMonth]);

  useEffect(() => {
    console.log(holidays.includes('25'));
  }, [holidays]);

  // FIXME: 아래 예시코드들을 실제 코드로 변경하여 적용하기
  const events: CustomEvent[] = [
    {
      start: new Date('2023-11-05T00:00:00'),
      end: new Date('2023-11-06T12:00:00'),
      title: 'MRI Registration',
      meridiem: 'all',
    },
    {
      start: new Date('2023-11-05T00:00:00'),
      end: new Date('2023-11-06T12:00:00'),
      title: 'MRI Registration',
      meridiem: 'am',
    },
  ];

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
    dateHeader: ({ date }: DateHeaderProps) => {
      const [currentDate, currentDay] = [date.getDate(), date.getDay()];

      return (
        <span
          className={Utils.combineClassNames(
            currentDay === 0 ? 'text-red-500' : '',
            currentDay === 6 ? 'text-blue-500' : '',
          )}
        >
          {currentDate}
        </span>
      );
    },
    header: ({ date }: HeaderProps) => {
      const dateList = ['일', '월', '화', '수', '목', '금', '토'];

      return <span>{dateList[date.getDay()]}</span>;
    },
    event: ({ title }: EventProps) => {
      return <span>{title}</span>;
    },
  };

  const dayPropGetter: DayPropGetter = useCallback(
    (date) => {
      const dayProp = {};
      const [currentDate, currentDay] = [date.getDate(), date.getDay()];
      const twoDigitDay = Utils.formatNumberToTwoDigits(currentDate);

      if (holidays.includes(twoDigitDay))
        Object.assign(dayProp, { className: 'bg-red' });

      switch (currentDay) {
        case 0:
          Object.assign(dayProp, { className: 'bg-red' });
          break;
        case 6:
          Object.assign(dayProp, { className: 'bg-blue' });
          break;
      }

      return dayProp; // TODO: index.css에서 @apply를 통해 style 입히기
    },
    [holidays],
  );

  const eventPropGetter: EventPropGetter<Event> = ({ title }) => {
    const eventProp = {};
    const green = title === 'MRI Registration' && 'bg-red';

    Object.assign(eventProp, { className: green });

    return eventProp;
  };

  return (
    <article className="flex w-4/5 flex-col items-center justify-center justify-self-center">
      <LeaveCalendar
        localizer={localizer}
        events={events}
        dayPropGetter={dayPropGetter}
        eventPropGetter={eventPropGetter}
        components={{
          toolbar: Toolbar,
          month: { ...Month },
        }}
        culture="ko-KR"
        className="!h-[80%] w-full"
      />
    </article>
  );
}
