const PATH_NAME: { [key: string]: string } = Object.freeze({
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

const COLLECTIONS_NAME = Object.freeze({
  USERS: 'users',
});

const USER_ROLE = Object.freeze({
  MASTER: 1,
  APPROVER: 2,
  MEMBER: 3,
});

const LOCALSTORAGE_KEYS = Object.freeze({
  THEME: 'theme',
});

const THEMES = Object.freeze({
  DARK: 'dark',
  LIGHT: 'light',
});

const REGEX = Object.freeze({
  EMAIL: /^[A-Za-z0-9._%+-]+@t-win\.kr$/,
});

const ERROR_TYPES: {
  [key: string]: {
    [key: string]: string;
  };
} = Object.freeze({
  COMMON: Object.freeze({
    EMAIL_VALIDATION: 'Only company email addresses (*@t-win.kr) are allowed.',
    PASSWORD_VALIDATION: 'Passwords must be at least 6 characters long.',
  }),
  FIREBASE: Object.freeze({
    'auth/invalid-login-credentials':
      'The email address or password is incorrect.',
  }),
});

export {
  PATH_NAME,
  PRIVATE_PATHS,
  COLLECTIONS_NAME,
  USER_ROLE,
  LOCALSTORAGE_KEYS,
  THEMES,
  REGEX,
  ERROR_TYPES,
};