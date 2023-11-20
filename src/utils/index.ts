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

const getRequestTitle = ({
  startDate,
  endDate,
  startMeridiem,
  endMeridiem,
}: DateRange) => {
  // FIXME: 중간에 주말이나 공휴일이 껴있을 때를 고려해서 계산해야 함
  const MILLISECONDS = 1000;
  const SECONDS_IN_A_DAY = 24 * 60 * 60;
  const { seconds: secondsOfStartDate } = startDate;
  const { seconds: secondsOfEndDate } = endDate;
  const startDateString = new Date(
    secondsOfStartDate * MILLISECONDS,
  ).toLocaleDateString('ko-KR', {
    year: '2-digit',
    month: '2-digit',
    day: '2-digit',
    weekday: 'short',
  });
  const endDateString = new Date(
    secondsOfEndDate * MILLISECONDS,
  ).toLocaleDateString('ko-KR', {
    year: '2-digit',
    month: '2-digit',
    day: '2-digit',
    weekday: 'short',
  });

  const term =
    (secondsOfEndDate +
      Number(endMeridiem === 'pm' && SECONDS_IN_A_DAY / 2) -
      (secondsOfStartDate +
        Number(startMeridiem === 'pm' && SECONDS_IN_A_DAY / 2)) +
      SECONDS_IN_A_DAY / 2) /
    SECONDS_IN_A_DAY;

  return `${startDateString} ${convertMeridiemToKorean(
    startMeridiem,
  )} ~ ${endDateString} ${convertMeridiemToKorean(endMeridiem)} (${term}일간)`;
};

const Utils = Object.freeze({
  getTheme,
  setTheme,
  getErrorMessage,
  hasNoEmptyValues,
  combineClassNames,
  convertMeridiemToKorean,
  getRequestTitle,
  fetchMembers,
  fetchCurrentUser,
  fetchRequests,
});

export default Utils;
