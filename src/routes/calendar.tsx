import 'react-big-calendar/lib/css/react-big-calendar.css';

import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';

import moment from 'moment';

const localizer = momentLocalizer(moment);

export default function Calendar() {
  return (
    <article className="flex items-center justify-center px-[10%]">
      <BigCalendar
        localizer={localizer}
        startAccessor="start"
        endAccessor="end"
        className="!h-[80%]"
      />
    </article>
  );
}

// TODO: https://velog.io/@yunju/달력-상태관리하기
