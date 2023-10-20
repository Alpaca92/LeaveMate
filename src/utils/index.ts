import { LOCALSTORAGE_KEYS } from '@/config/config';

const getErrorMessage = (message: string): string =>
  message || 'An unexpected exception occurred.';

const getTheme = () => localStorage.getItem(LOCALSTORAGE_KEYS.THEME);

const Utils = Object.freeze({
  getErrorMessage,
  getTheme,
});

export default Utils;
