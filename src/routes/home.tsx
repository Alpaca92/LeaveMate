import Modal from '@/components/modal';
import { useState } from 'react';
import { useController, useForm } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.min.css';

interface RequestInput {
  reason: string;
  startDate: Date;
  startMeridiem: string;
  endDate: Date;
  endMeridiem: string;
}

export default function Home() {
  const DATE_NOW = new Date(Date.now());
  const [isLoading, setIsLoading] = useState(false);
  const [isShow, setIsShow] = useState(false);
  const [startDate, setStartDate] = useState(DATE_NOW);
  const [endDate, setEndDate] = useState(DATE_NOW);
  const { register, handleSubmit, control } = useForm<RequestInput>({
    defaultValues: {
      reason: '일신상의 사유',
    },
  });
  const { field: startField } = useController({
    name: 'startDate',
    defaultValue: startDate,
    control,
    rules: {
      required: true,
    },
  });
  const { field: endField } = useController({
    name: 'endDate',
    defaultValue: endDate,
    control,
    rules: {
      required: true,
    },
  });

  const onClick = () => {
    setIsShow(true);
  };

  const onClose = () => {
    setIsShow(false);
  };

  const onStartDateChange = (date: Date) => {
    startField.onChange(date);
    setStartDate(date);
  };

  const onEndDateChange = (date: Date) => {
    endField.onChange(date);
    setEndDate(date);
  };

  const onSubmit = async (data: RequestInput) => {
    console.log(data);
  };

  return (
    <article className="relative">
      <button
        onClick={onClick}
        className="fixed bottom-[13%] right-[5%] h-16 w-16 overflow-hidden rounded-full fill-current"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path
            fillRule="evenodd"
            d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      <Modal isShow={isShow} onClose={onClose}>
        <h1 className="text-xl font-extrabold">휴가 신청</h1>
        <form className="mt-3 flex flex-col" onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="reason">사유</label>
          <textarea
            required
            id="reason"
            rows={3}
            className="mt-1 w-full resize-none rounded-lg px-3 py-2 text-light-text-main focus:outline-none"
            {...register('reason', {
              required: true,
            })}
          />
          <label htmlFor="start-date" className="mt-1">
            시작일
          </label>
          <div className="mt-1 flex justify-between">
            <DatePicker
              id="start-date"
              className="rounded-lg px-3 py-2 text-dark-text-main focus:outline-none dark:text-light-text-main"
              onChange={onStartDateChange}
              selected={startDate}
              startDate={startDate}
              dateFormat="yyyy/MM/dd"
              name={startField.name}
            />
            <select
              required
              className="rounded-lg px-3 py-2 text-dark-text-main focus:outline-none dark:text-light-text-main"
              {...register('startMeridiem', {
                required: true,
              })}
            >
              <option value="am" selected>
                오전
              </option>
              <option value="pm">오후</option>
            </select>
          </div>
          <label htmlFor="end-date" className="mt-1">
            종료일
          </label>
          <div className="mt-1 flex justify-between">
            <DatePicker
              id="end-date"
              className="rounded-lg px-3 py-2 text-dark-text-main focus:outline-none dark:text-light-text-main"
              onChange={onEndDateChange}
              selected={endDate}
              endDate={endDate}
              dateFormat="yyyy/MM/dd"
              name={endField.name}
            />
            <select
              required
              className="rounded-lg px-3 py-2 text-dark-text-main focus:outline-none dark:text-light-text-main"
              {...register('endMeridiem', {
                required: true,
              })}
            >
              <option value="am">오전</option>
              <option value="pm" selected>
                오후
              </option>
            </select>
          </div>
          <button
            disabled={isLoading}
            className="!mt-5 w-full rounded-lg bg-light-text-main py-3 font-semibold text-dark-text-main dark:bg-dark-text-main dark:text-light-text-main"
          >
            {isLoading ? 'Loading...' : 'Request'}
          </button>
        </form>
      </Modal>
    </article>
  );
}
