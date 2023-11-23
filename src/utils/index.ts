import { LOCALSTORAGE_KEYS, THEMES } from '@/config/config';
import {
  fetchCurrentUser,
  fetchMembers,
  fetchRequests,
  fetchPublicHolidays,
} from './fetcher';
import type { DateRange } from '@/types';
import { ClassValue } from 'clsx';
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

// FIXME: 중간에 주말이나 공휴일이 껴있을 때를 고려해서 계산해야 함
const getWeekdaysBetweenDates = ({
  startDate,
  endDate,
  startMeridiem,
  endMeridiem,
}: DateRange): number => {
  const MILLISECONDS = 1000;
  const MILLISECONDS_IN_A_DAY = 24 * 60 * 60 * MILLISECONDS;
  const term =
    (endDate +
      Number(endMeridiem === 'pm' && MILLISECONDS_IN_A_DAY / 2) -
      (startDate +
        Number(startMeridiem === 'pm' && MILLISECONDS_IN_A_DAY / 2)) +
      MILLISECONDS_IN_A_DAY / 2) /
    MILLISECONDS_IN_A_DAY;

  return term;
};

const getRequestTitle = ({
  startDate,
  endDate,
  startMeridiem,
  endMeridiem,
}: DateRange) => {
  const startDateString = new Date(startDate).toLocaleDateString('ko-KR', {
    year: '2-digit',
    month: '2-digit',
    day: '2-digit',
    weekday: 'short',
  });
  const endDateString = new Date(endDate).toLocaleDateString('ko-KR', {
    year: '2-digit',
    month: '2-digit',
    day: '2-digit',
    weekday: 'short',
  });

  const term = getWeekdaysBetweenDates({
    startDate,
    endDate,
    startMeridiem,
    endMeridiem,
  });

  return `${startDateString} ${convertMeridiemToKorean(
    startMeridiem,
  )} ~ ${endDateString} ${convertMeridiemToKorean(endMeridiem)} (${term}일간)`;
};

const formatNumberToTwoDigits = (number: number): string =>
  ('0' + number.toString()).slice(-2);

const Utils = Object.freeze({
  getTheme,
  setTheme,
  getErrorMessage,
  hasNoEmptyValues,
  combineClassNames,
  convertMeridiemToKorean,
  getRequestTitle,
  formatNumberToTwoDigits,
  fetchMembers,
  fetchCurrentUser,
  fetchRequests,
  fetchPublicHolidays,
});

export default Utils;
