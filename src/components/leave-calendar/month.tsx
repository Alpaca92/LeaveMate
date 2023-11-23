import RootStore from '@/stores/store';
import Utils from '@/utils';
import { DateHeaderProps, EventProps, HeaderProps } from 'react-big-calendar';

export default function Month() {
  const { holidays: koreaHolidays } = RootStore(({ holidays }) => ({
    holidays,
  }));

  const dateHeader = ({ date }: DateHeaderProps) => {
    const [currentMonth, currentDate, currentDay] = [
      date.getMonth() + 1,
      date.getDate(),
      date.getDay(),
    ];
    const twoDigitDay = Utils.formatNumberToTwoDigits(currentDate);
    const [currentMonthHolidays] = koreaHolidays.filter(
      (holidays) => holidays.month === currentMonth,
    );

    return (
      <span
        className={Utils.combineClassNames(
          currentDay === 0 ? 'text-red-500' : '',
          currentDay === 6 ? 'text-blue-500' : '',
          currentMonthHolidays?.holidays?.includes(twoDigitDay)
            ? 'text-red-500'
            : '',
        )}
      >
        {currentDate}
      </span>
    );
  };
  const header = ({ date }: HeaderProps) => {
    const dateList = ['일', '월', '화', '수', '목', '금', '토'];

    return <span>{dateList[date.getDay()]}</span>;
  };
  const event = ({ title }: EventProps) => {
    return <span>{title}</span>;
  };

  return { dateHeader, header, event };
}
