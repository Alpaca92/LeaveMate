import { LOCALSTORAGE_KEYS, THEMES } from '@/config/config';
import Utils from '@/utils';
import { useEffect } from 'react';

interface ThemeProviderProps {
  children: React.ReactNode;
}

export default function ThemeProvider({ children }: ThemeProviderProps) {
  useEffect(() => {
    const theme = Utils.getTheme();

    switch (theme) {
      case THEMES.DARK:
        document.body.classList.add(THEMES.DARK);
        break;
      case THEMES.LIGHT:
        document.body.classList.remove(THEMES.DARK);
        break;
      default:
        localStorage.setItem(LOCALSTORAGE_KEYS.THEME, THEMES.DARK);
        document.body.classList.add(THEMES.DARK);
        break;
    }
  }, []);

  // FIXME: 추후에 mode toggle button을 만들면 state를 추가해서 관리하는게 더 편할 수 있음

  return children;
}
