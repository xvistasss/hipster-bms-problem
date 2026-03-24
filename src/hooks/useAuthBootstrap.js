// Responsibilities:
// - Token management hook.
// - Bootstrap login at app start using this custom hook
// - Populate Zustand store
// - Handle loading / error state
// - Log API failures cleanly

import { useEffect } from 'react';
import { authService } from '../services/authServices';
import { loggerService } from '../services/loggerServices';
import { useAuthStore } from '../store/authStore';

export const useAuthBootstrap = () => {
  const setToken = useAuthStore((state) => state.setToken);
  const setLoading = useAuthStore((state) => state.setLoading);
  const setAuthReady = useAuthStore((state) => state.setAuthReady);

  useEffect(() => {
    const bootstrap = async () => {
      try {
        setLoading(true);

        const existingToken = localStorage.getItem('token');

        if (existingToken) {
          setAuthReady(true);
          return;
        }

        const token = await authService.login();

        setToken(token);
        setAuthReady(true);

        loggerService.info('Auth bootstrap success');
      } catch (error) {
        loggerService.error('Login request failed', {
          error: error.message,
        });

        throw error;
      } finally {
        setLoading(false);
      }
    };

    bootstrap();
  }, [setToken, setLoading, setAuthReady]);
};
