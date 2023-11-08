import { useState } from 'react';
import { useController, useForm } from 'react-hook-form';
import { addDoc, collection } from 'firebase/firestore';
import { auth, db } from '@/config/firebase';
import { COLLECTIONS_NAME, ERROR_MESSAGES } from '@/config/config';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.min.css';
import Utils from '@/utils';

interface RequestModalProps {
  controller: React.Dispatch<React.SetStateAction<boolean>>;
}

interface RequestInput {
  reason: string;
  startDate: Date;
  startMeridiem: string;
  endDate: Date;
  endMeridiem: string;
}

export default function RequestModal({ controller }: RequestModalProps) {
  const user = auth.currentUser;
  const DATE_NOW = new Date(Date.now());
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<RequestInput>({
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
      required: {
        value: true,
        message: Utils.getErrorMessage(ERROR_MESSAGES.COMMON.DATE_VALIDATION),
      },
    },
  });
  const { field: endField } = useController({
    name: 'endDate',
    defaultValue: DATE_NOW,
    control,
    rules: {
      required: {
        value: true,
        message: Utils.getErrorMessage(ERROR_MESSAGES.COMMON.DATE_VALIDATION),
      },
    },
  });

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

      controller(false);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <h1 className="text-xl font-extrabold">휴가 신청</h1>
      <form className="mt-3 flex flex-col" onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="reason">사유</label>
        <textarea
          id="reason"
          rows={3}
          className="mt-1 w-full resize-none rounded-lg px-3 py-2 text-light-text-main focus:outline-none"
          {...register('reason', {
            required: {
              value: true,
              message: Utils.getErrorMessage(
                ERROR_MESSAGES.COMMON.REQUEST_REASON_VALIDATION,
              ),
            },
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
            className="rounded-lg px-3 py-2 text-dark-text-main focus:outline-none dark:text-light-text-main"
            {...register('startMeridiem', {
              required: {
                value: true,
                message: Utils.getErrorMessage(
                  ERROR_MESSAGES.COMMON.MERIDIEM_VALIDATION,
                ),
              },
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
            className="rounded-lg px-3 py-2 text-dark-text-main focus:outline-none dark:text-light-text-main"
            {...register('endMeridiem', {
              required: {
                value: true,
                message: Utils.getErrorMessage(
                  ERROR_MESSAGES.COMMON.MERIDIEM_VALIDATION,
                ),
              },
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
    </>
  );
}
