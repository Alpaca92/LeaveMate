import BottomNavigation from '@/components/bottom-navigation';
import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <main className="h-screen grid grid-rows-[90%_10%]">
      <Outlet />
      <BottomNavigation />
    </main>
  );
}
