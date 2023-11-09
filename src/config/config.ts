type Path = '/login' | '/signup' | '/' | '/calendar' | '/profile';

interface Pathname {
  [key: string]: Path;
}

const PATH_NAME: Pathname = Object.freeze({
  LOGIN: '/login',
  SIGNUP: '/signup',
  HOME: '/',
  CALENDAR: '/calendar',
  PROFILE: '/profile',
});

const PRIVATE_PATHS: readonly string[] = Object.freeze([
  PATH_NAME.HOME,
  PATH_NAME.CALENDAR,
  PATH_NAME.PROFILE,
]);

const USER_ROLES = Object.freeze({
  MASTER: 0,
  EXECUTIVE: 1,
  LEADER: 2,
  MEMBER: 3,
});

const COLLECTIONS_NAME = Object.freeze({
  REQUESTS: 'requests',
  USERS: 'users',
});

const LOCALSTORAGE_KEYS = Object.freeze({
  THEME: 'theme',
});

const PORTAL_KEYS = Object.freeze({
  MODAL: 'modal',
});

const THEMES = Object.freeze({
  DARK: 'dark',
  LIGHT: 'light',
});

const REGEX = Object.freeze({
  EMAIL: /^[A-Za-z0-9._%+-]+@t-win\.kr$/,
});

interface ErrorMessages {
  COMMON: {
    NAME_LENGTH_VALIDATION: string;
    APPROVER_VALIDATION: string;
    DATE_VALIDATION: string;
    EMAIL_VALIDATION: string;
    PASSWORD_VALIDATION: string;
    REQUEST_REASON_VALIDATION: string;
    MERIDIEM_VALIDATION: string;
  };
  FIREBASE: {
    'auth/invalid-login-credentials': string;
    'auth/too-many-requests': string;
    [key: string]: string;
  };
}

const ERROR_MESSAGES: ErrorMessages = Object.freeze({
  COMMON: Object.freeze({
    NAME_LENGTH_VALIDATION: 'The name must be at least 2 characters long.',
    APPROVER_VALIDATION: 'Please choose an approver.',
    DATE_VALIDATION: 'Please choose a date.',
    EMAIL_VALIDATION: 'Only company email addresses (*@t-win.kr) are allowed.',
    PASSWORD_VALIDATION: 'Passwords must be at least 6 characters long.',
    REQUEST_REASON_VALIDATION: 'Please provide a reason for the leave.',
    MERIDIEM_VALIDATION: 'Please select either AM or PM.',
  }),
  FIREBASE: Object.freeze({
    'auth/invalid-login-credentials':
      'The email address or password is incorrect.',
    'auth/too-many-requests':
      'The server is temporarily unavailable. Please try again later.',
  }),
});

export type { Path };
export {
  PATH_NAME,
  PRIVATE_PATHS,
  USER_ROLES,
  COLLECTIONS_NAME,
  LOCALSTORAGE_KEYS,
  PORTAL_KEYS,
  THEMES,
  REGEX,
  ERROR_MESSAGES,
};
