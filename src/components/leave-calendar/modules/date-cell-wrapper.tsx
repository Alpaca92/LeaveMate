import { DateStateContext } from '@/components/leave-calendar';
import Utils from '@/utils';
import { useContext } from 'react';
import { DateCellWrapperProps } from 'react-big-calendar';

export default function DateCellWrapper({ value }: DateCellWrapperProps) {
  const { month } = useContext(DateStateContext);

  return (
    <div
      className={Utils.combineClassNames(
        value.getMonth() + 1 !== month
          ? 'bg-light-background-secondary dark:bg-dark-background-secondary'
          : '',
        'w-full border-r border-dark-background-main last:border-none dark:border-light-background-main',
      )}
    />
  );
}
