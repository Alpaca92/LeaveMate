import LeaveCalendar from '@/components/leave-calendar';
import moment from 'moment';
import { momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

moment.locale('ko-KR');
const localizer = momentLocalizer(moment);

export default function Calendar() {
  return (
    <article className="flex w-4/5 flex-col items-center justify-center justify-self-center">
      <LeaveCalendar localizer={localizer} />
    </article>
  );
}
