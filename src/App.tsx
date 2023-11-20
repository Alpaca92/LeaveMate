import { auth } from '@/config/firebase';
import router from '@/router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { RouterProvider } from 'react-router-dom';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { THEMES } from '@/config/config';
import Utils from '@/utils';

const queryClient = new QueryClient();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const init = async () => {
    await auth.authStateReady();
    setIsLoading(false);
  };

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    const theme = Utils.getTheme();
    if (!theme) {
      Utils.setTheme(THEMES.DARK);
    } else {
      theme === THEMES.DARK
        ? document.body.classList.add(THEMES.DARK)
        : document.body.classList.add(THEMES.LIGHT);
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      {isLoading ? (
        <main className="h-screen bg-light-background-main dark:bg-dark-background-main" />
      ) : (
        <RouterProvider router={router} />
      )}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
