import BottomNavigation from '@/components/bottom-navigation';
import RouteGuard from '@/components/route-guard';
import { auth } from '@/config/firebase';
import { Outlet } from 'react-router-dom';

export default function Layout() {
  console.log(auth.currentUser);

  return (
    <RouteGuard>
      <main className="grid h-screen grid-rows-[90%_10%] bg-light-background-main text-light-text-main dark:bg-dark-background-main dark:text-dark-text-main">
        <Outlet />
        <BottomNavigation />
      </main>
    </RouteGuard>
  );
}
