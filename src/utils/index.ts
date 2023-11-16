import { LOCALSTORAGE_KEYS, THEMES } from '@/config/config';
import { fetchCurrentUser, fetchMembers, fetchRequests } from './fetcher';

import { ClassValue } from 'clsx';
import type { DateRange } from '@/types';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

const getTheme = () => localStorage.getItem(LOCALSTORAGE_KEYS.THEME);

const setTheme = (theme: string) => {
  const currentTheme = getTheme();

  if (theme !== currentTheme) {
    localStorage.setItem(LOCALSTORAGE_KEYS.THEME, theme);

    if (theme === THEMES.DARK) {
      document.body.classList.add(THEMES.DARK);
      document.body.classList.remove(THEMES.LIGHT);
    } else {
      document.body.classList.add(THEMES.LIGHT);
      document.body.classList.remove(THEMES.DARK);
    }
  }
};

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
  setTheme,
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
