import { fetchCurrentUser, fetchMembers, fetchRequests } from './fetcher';

import { ClassValue } from 'clsx';
import type { DateRange } from '@/types';
import { LOCALSTORAGE_KEYS } from '@/config/config';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

const getTheme = () => localStorage.getItem(LOCALSTORAGE_KEYS.THEME);

const getErrorMessage = (message: string): string =>
  message || 'An unexpected exception occurred.';

const hasNoEmptyValues = <T>(data: T) => {
  let hasValue = true;

  for (const key in data) {
    if (data[key] === undefined && data[key] === null) {
      hasValue = false;
    }
  }

  return hasValue;
};

const combineClassNames = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

const convertMeridiemToKorean = (meridiem: string) =>
  meridiem === 'am' ? '오전' : '오후';

const getDateRangeToNumber = ({
  startDate,
  endDate,
  endMeridiem,
  startMeridiem,
}: DateRange) => {
  // TODO: 휴가 기간동안이 몇일인지 숫자로 표현하는 함수
};

const Utils = Object.freeze({
  getTheme,
  getErrorMessage,
  hasNoEmptyValues,
  combineClassNames,
  convertMeridiemToKorean,
  getDateRangeToNumber,
  fetchMembers,
  fetchCurrentUser,
  fetchRequests,
});

export default Utils;
