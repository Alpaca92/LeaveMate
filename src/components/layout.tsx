import BottomNavigation from '@/components/bottom-navigation';
import { container } from '@/components/layout.css';
import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <main className={container}>
      <Outlet />
      <BottomNavigation />
    </main>
  );
}
