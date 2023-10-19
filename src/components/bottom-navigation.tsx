import { PATH_NAME } from '@/config/config';
import { Link } from 'react-router-dom';

interface Icon {
  path: string;
  icon: JSX.Element;
}

const ICONS: Icon[] = [
  {
    path: PATH_NAME.HOME,
    icon: (
      <svg
        className="w-full"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
        />
      </svg>
    ),
  },
  {
    path: PATH_NAME.CALENDAR,
    icon: (
      <svg
        className="w-full"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
        />
      </svg>
    ),
  },
  {
    path: PATH_NAME.PROFILE,
    icon: (
      <svg
        className="w-full"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
        />
      </svg>
    ),
  },
];

export default function BottomNavigation() {
  return (
    <nav>
      <ul className="flex h-full items-center justify-around border-t border-light-text-secondary py-4 dark:border-dark-text-secondary">
        {ICONS.map((ICON, i) => (
          <li key={i}>
            <Link
              to={ICON.path}
              className="block w-8 stroke-light-text-secondary dark:stroke-dark-text-secondary"
            >
              {ICON.icon}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
