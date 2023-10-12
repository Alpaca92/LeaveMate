import BottomNavigation from '@/components/bottom-navigation';
import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <main>
      <Outlet />
      <BottomNavigation />
    </main>
  );
}
