import DateCellWrapper from '@/components/leave-calendar/date-cell-wrapper';
import EventWrapper from '@/components/leave-calendar/event-wrapper';
import Toolbar from '@/components/leave-calendar/toolbar';
import { YearAndMonth } from '@/types';
import Utils from '@/utils';
import { Dispatch, createContext, useReducer } from 'react';
import { Calendar, Event, DateLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Month from './month';
import RootStore from '@/stores/store';
import { useShallow } from 'zustand/react/shallow';

interface LeaveCalendarProps {
  localizer: DateLocalizer;
  className?: string;
}

interface Action {
  type: 'next' | 'prev' | 'today';
}

type Reducer = (state: YearAndMonth, action: Action) => YearAndMonth;

const TODAY = new Date();

const initialState: YearAndMonth = {
  year: TODAY.getFullYear(),
  month: TODAY.getMonth() + 1,
};

const reducer: Reducer = ({ year, month }, action) => {
  switch (action.type) {
    case 'next': {
      const newMonth = month + 1;

      if (newMonth === 13) {
        return { year: year + 1, month: 1 };
      } else {
        return { year, month: newMonth };
      }
    }
    case 'prev': {
      const newMonth = month - 1;

      if (!newMonth) {
        return { year: year - 1, month: 12 };
      } else {
        return { year, month: newMonth };
      }
    }
    case 'today': {
      return { ...initialState };
    }
  }
};

export const DateStateContext = createContext<YearAndMonth>(initialState);
export const DateDispatchContext = createContext<Dispatch<Action> | null>(null);

export default function LeaveCalendar({
  localizer,
  className,
  ...rest
}: LeaveCalendarProps) {
  const [state, dispatch] = useReducer<Reducer>(reducer, initialState);

  const events: Event[] = RootStore(
    useShallow(({ requests }) =>
      requests
        .filter((request) => request.status === 'approve')
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

  return (
    <DateStateContext.Provider value={state}>
      <DateDispatchContext.Provider value={dispatch}>
        <Calendar
          localizer={localizer}
          events={events}
          components={{
            toolbar: Toolbar,
            month: { ...Month() },
            dateCellWrapper: DateCellWrapper,
            eventWrapper: EventWrapper,
          }}
          culture="ko-KR"
          className={Utils.combineClassNames('!h-[80%] w-full', className)}
          {...rest}
        />
      </DateDispatchContext.Provider>
    </DateStateContext.Provider>
  );
}
