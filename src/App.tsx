import Loading from '@/components/loading';
import ThemeProvider from '@/components/theme-provider';
import { auth } from '@/config/firebase';
import router from '@/router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { RouterProvider } from 'react-router-dom';

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

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        {isLoading ? (
          <main className="flex h-screen items-center justify-center bg-light-background-main text-light-text-main dark:bg-dark-background-main dark:text-dark-text-main">
            <Loading />
          </main>
        ) : (
          <RouterProvider router={router} />
        )}
      </ThemeProvider>
    </QueryClientProvider>
  );
}
