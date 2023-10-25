import Modal from '@/components/modal';
import { useEffect, useState } from 'react';
import { useController, useForm } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.min.css';
import { addDoc, collection } from 'firebase/firestore';
import { auth, db } from '@/config/firebase';
import { COLLECTIONS_NAME } from '@/config/config';
interface RequestInput {
  reason: string;
  startDate: Date;
  startMeridiem: string;
  endDate: Date;
  endMeridiem: string;
}

export default function Home() {
  const user = auth.currentUser;
  const DATE_NOW = new Date(Date.now());
  const [isLoading, setIsLoading] = useState(false);
  const [isShow, setIsShow] = useState(false);
  const { register, handleSubmit, control } = useForm<RequestInput>({
    defaultValues: {
      reason: '일신상의 사유',
      startMeridiem: 'am',
      endMeridiem: 'pm',
    },
  });
  const { field: startField } = useController({
    name: 'startDate',
    defaultValue: DATE_NOW,
    control,
    rules: {
      required: true,
    },
  });
  const { field: endField } = useController({
    name: 'endDate',
    defaultValue: DATE_NOW,
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
  };

  const onEndDateChange = (date: Date) => {
    endField.onChange(date);
  };

  const onSubmit = async ({
    reason,
    endDate,
    endMeridiem,
    startDate,
    startMeridiem,
  }: RequestInput) => {
    try {
      setIsLoading(true);

      if (
        !user?.uid ||
        !user?.displayName ||
        !reason ||
        !endDate ||
        !endMeridiem ||
        !startDate ||
        !startMeridiem
      ) {
        return;
      }

      await addDoc(collection(db, COLLECTIONS_NAME.REQUESTS), {
        userId: user?.uid,
        username: user?.displayName,
        createdAt: Date.now(),
        reason,
        endDate,
        endMeridiem,
        startDate,
        startMeridiem,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    console.log(startField.value);
  }, [startField.value]);

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
              selected={startField.value}
              startDate={startField.value}
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
              <option value="am">오전</option>
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
              selected={endField.value}
              endDate={endField.value}
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
              <option value="pm">오후</option>
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
