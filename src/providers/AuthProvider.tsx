import { ReactNode, useEffect } from 'react';
import { useAuthStore } from '../store/auth';

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const setIsLoading = useAuthStore((state) => state.setIsLoading);

  useEffect(() => {
    // Simulate auth check
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [setIsLoading]);

  return <>{children}</>;
}