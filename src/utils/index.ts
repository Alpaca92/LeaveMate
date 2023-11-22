import { LOCALSTORAGE_KEYS, THEMES } from '@/config/config';
import { fetchCurrentUser, fetchMembers, fetchRequests } from './fetcher';
import type { DateRange, YearAndMonth } from '@/types';
import { ClassValue } from 'clsx';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import axios from 'axios';

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
  const MILLISECONDS_IN_A_DAY = 24 * 60 * 60 * MILLISECONDS;
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

  const term =
    (endDate +
      Number(endMeridiem === 'pm' && MILLISECONDS_IN_A_DAY / 2) -
      (startDate +
        Number(startMeridiem === 'pm' && MILLISECONDS_IN_A_DAY / 2)) +
      MILLISECONDS_IN_A_DAY / 2) /
    MILLISECONDS_IN_A_DAY;

  return `${startDateString} ${convertMeridiemToKorean(
    startMeridiem,
  )} ~ ${endDateString} ${convertMeridiemToKorean(endMeridiem)} (${term}일간)`;
};

const formatNumberToTwoDigits = (number: number): string =>
  ('0' + number.toString()).slice(-2);

interface Holiday {
  dateKind: string;
  dateName: string;
  isHoliday: string;
  locdate: number;
  seq: number;
}

interface GetHolidaysAxiosResponse {
  data: {
    response: {
      body: {
        items: {
          item?: Holiday[] | Holiday;
        };
      };
    };
  };
}

const getHolidays = async ({ year, month }: YearAndMonth) => {
  const baseUrl =
    'https://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getHoliDeInfo';
  const apiKey =
    'eZ17cnoKvHmrAu76may4JvwjqwpWBdD2bP%2Fs4mFIZjIphAOMnKRq8yOHaC3DXjYEpWJyic%2FdtW14XLgGJxJ%2B1g%3D%3D';
  const url = `${baseUrl}?serviceKey=${apiKey}&solYear=${year}&solMonth=${formatNumberToTwoDigits(
    month,
  )}`;

  const {
    data: {
      response: {
        body: {
          items: { item: holidays },
        },
      },
    },
  }: GetHolidaysAxiosResponse = await axios.get(url);

  if (!holidays) return [];

  if (holidays instanceof Array) {
    return holidays.map((holiday) => holiday.locdate.toString().slice(-2));
  } else {
    return [holidays.locdate.toString().slice(-2)];
  }
};

const Utils = Object.freeze({
  getTheme,
  setTheme,
  getErrorMessage,
  hasNoEmptyValues,
  combineClassNames,
  convertMeridiemToKorean,
  getRequestTitle,
  formatNumberToTwoDigits,
  getHolidays,
  fetchMembers,
  fetchCurrentUser,
  fetchRequests,
});

export default Utils;
