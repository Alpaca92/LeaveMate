import { LOCALSTORAGE_KEYS } from '@/config/config';
import { fetchMembers, fetchCurrentUser } from './fetcher';

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

const Utils = Object.freeze({
  getTheme,
  getErrorMessage,
  hasNoEmptyValues,
  fetchMembers,
  fetchCurrentUser,
});

export default Utils;
