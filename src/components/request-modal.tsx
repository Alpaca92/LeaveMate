import 'react-datepicker/dist/react-datepicker.min.css';

import { COLLECTIONS_NAME, ERROR_MESSAGES } from '@/config/config';
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import { auth, db } from '@/config/firebase';
import { useController, useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';

import Button from '@/components/button';
import DatePicker from 'react-datepicker';
import RootStore from '@/stores/store';
import Utils from '@/utils';
import { useShallow } from 'zustand/react/shallow';

interface RequestModalProps {
  setModalVisivility: React.Dispatch<React.SetStateAction<boolean>>;
}

interface RequestInput {
  reason: string;
  startDate: Date;
  startMeridiem: string;
  endDate: Date;
  endMeridiem: string;
  approver: string;
}

export default function RequestModal({
  setModalVisivility,
}: RequestModalProps) {
  const user = auth.currentUser;
  const { currentUser, updateCurrentUser } = RootStore(
    useShallow((state) => ({
      currentUser: state.currentUser,
      updateCurrentUser: state.updateCurrentUser,
    })),
  );
  const members = RootStore(
    useShallow((state) =>
      state.members.filter(
        (member) =>
          member.name !== user?.displayName && member.role < currentUser.role,
      ),
    ),
  );
  const DATE_NOW = new Date(Date.now());
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<RequestInput>({
    defaultValues: {
      reason: '일신상의 사유',
      startMeridiem: 'am',
      endMeridiem: 'pm',
      approver: currentUser.approver ?? '',
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

  const onRequestSubmit = async (data: RequestInput) => {
    const { reason, endDate, endMeridiem, startDate, startMeridiem, approver } =
      data;

    if (!Utils.hasNoEmptyValues(data)) return;

    try {
      setIsLoading(true);

      await addDoc(collection(db, COLLECTIONS_NAME.REQUESTS), {
        userId: user?.uid,
        username: user?.displayName,
        createdAt: Date.now(),
        reason,
        approver,
        endMeridiem,
        startMeridiem,
        endDate: endDate.toLocaleDateString('ko-KR', {
          year: '2-digit',
          month: '2-digit',
          day: '2-digit',
          weekday: 'short',
        }),
        startDate: startDate.toLocaleDateString('ko-KR', {
          year: '2-digit',
          month: '2-digit',
          day: '2-digit',
          weekday: 'short',
        }),
      });

      await updateDoc(
        doc(collection(db, COLLECTIONS_NAME.USERS), currentUser.userId),
        {
          approver,
        },
      );

      updateCurrentUser({ approver });
      setModalVisivility(false);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (currentUser.approver !== undefined) {
      setValue('approver', currentUser.approver ?? '');
    }
  }, [setValue, currentUser.approver]);

  return (
    <>
      <h1 className="text-xl font-extrabold">휴가 신청</h1>
      <form
        className="mt-3 flex flex-col space-y-1"
        onSubmit={handleSubmit(onRequestSubmit)}
      >
        <label htmlFor="reason">사유</label>
        <textarea
          id="reason"
          rows={3}
          className="w-full resize-none rounded-lg px-3 py-2 text-light-text-main focus:outline-none"
          {...register('reason', {
            required: {
              value: true,
              message: Utils.getErrorMessage(
                ERROR_MESSAGES.COMMON.REQUEST_REASON_VALIDATION,
              ),
            },
          })}
        />
        <label htmlFor="start-date">시작일</label>
        <div className="flex justify-between">
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
        <label htmlFor="end-date">종료일</label>
        {/* FIXME: mobile 환경에서 DatePicker와 select가 overflow되는 현상 수정: https://stackoverflow.com/a/65804356/14460912 */}
        <div className="flex justify-between">
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
        <label htmlFor="end-date">결재자</label>
        <select
          className="h-10 rounded-lg px-3 py-2 text-dark-text-main focus:outline-none dark:text-light-text-main"
          {...register('approver', {
            required: {
              value: true,
              message: Utils.getErrorMessage(
                ERROR_MESSAGES.COMMON.APPROVER_VALIDATION,
              ),
            },
          })}
        >
          <option value="">결재자를 선택해주세요</option>
          {members.map((member) => (
            <option key={member.userId} value={member.name}>
              {member.name}
            </option>
          ))}
        </select>
        <Button disabled={isLoading} className="!mt-5 py-3">
          {isLoading ? 'Loading...' : 'Request'}
        </Button>
      </form>
    </>
  );
}
