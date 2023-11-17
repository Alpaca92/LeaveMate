import Utils from '@/utils';
import moment from 'moment';
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

// FIXME: 시간으로 짤라서 background: linear-gradient(to right, red 75%, blue 75%, blue 100%); 처럼 계산할텐데 meridiem이 필요할까?
interface CustomEvent extends Event {
  meridiem: 'am' | 'pm' | 'all';
}

export default function Calendar() {
  moment.locale('ko-KR');
  const localizer = momentLocalizer(moment);

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
    const [year, month] = [
      date.getFullYear(),
      ('0' + (date.getMonth() + 1).toString()).slice(-2),
    ];
    const navigate = (action: NavigateAction) => onNavigate(action);

    return (
      <div className="flex items-center justify-center space-x-4 stroke-light-background-main stroke-2 text-2xl">
        <button
          onClick={navigate.bind(null, 'PREV')}
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
        <p onClick={navigate.bind(null, 'TODAY')}>{`${year} / ${month}`}</p>
        <button
          onClick={navigate.bind(null, 'NEXT')}
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

  const dayPropGetter: DayPropGetter = (date) => {
    const dayProp = {};
    const day = date.getDay();

    switch (day) {
      case 0:
        Object.assign(dayProp, { className: 'bg-red' });
        break;
      case 6:
        Object.assign(dayProp, { className: 'bg-blue' });
        break;
    }

    return dayProp; // TODO: index.css에서 @apply를 통해 style 입히기
  };

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
        className="!h-[80%] w-full"
      />
    </article>
  );
}
