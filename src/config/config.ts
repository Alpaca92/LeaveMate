const PATH_NAME = {
  LOGIN: '/login',
  SIGNUP: '/signup',
  HOME: '/',
  CALENDAR: '/calendar',
  PROFILE: '/profile',
};

const COLLECTIONS_NAME = {
  USERS: 'users',
};

const USER_ROLE = {
  MASTER: 1,
  APPROVER: 2,
  MEMBER: 3,
};

const LOCALSTORAGE_KEYS = {
  THEME: 'theme',
};

const THEMES = {
  DARK: 'dark',
  LIGHT: 'light',
};

const REGEX = {
  EMAIL: /^[A-Za-z0-9._%+-]+@t-win\.kr$/,
};

const ERROR_MESSAGES = {
  EMAIL_VALIDATION: 'Only company email addresses (*@t-win.kr) are allowed.',
  PASSWORD_VALIDATION: 'Passwords must be at least 6 characters long.',
};

Object.freeze(PATH_NAME);
Object.freeze(COLLECTIONS_NAME);
Object.freeze(USER_ROLE);
Object.freeze(LOCALSTORAGE_KEYS);
Object.freeze(THEMES);
Object.freeze(REGEX);
Object.freeze(ERROR_MESSAGES);

export {
  PATH_NAME,
  COLLECTIONS_NAME,
  USER_ROLE,
  LOCALSTORAGE_KEYS,
  THEMES,
  REGEX,
  ERROR_MESSAGES,
};
