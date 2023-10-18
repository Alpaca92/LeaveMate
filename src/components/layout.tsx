import BottomNavigation from '@/components/bottom-navigation';
import { container } from '@/components/layout.css';
import ProtectRoutes from '@/components/protect-routes';
import { darkTheme } from '@/themes/dark.css';
import { lightTheme } from '@/themes/light.css';
import { base } from '@/themes/theme.css';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';

export default function Layout() {
  const [isDark, setIsDark] = useState(true);

  return (
    <main className={`${isDark ? darkTheme : lightTheme} ${base} ${container}`}>
      <Outlet />
      <BottomNavigation />
    </main>
  );
}
