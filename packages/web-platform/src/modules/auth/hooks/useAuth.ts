import { useEffect } from 'react';

import {
  getAuthRedirectUrl,
  loginWithProvider,
  loginWithPassword,
  logout,
} from '~/auth/services/auth.service';
import { jwtStorage } from '~/auth/services/jwt-storage.service';
import { useAuthState, useSetAuth } from '~/auth/stores/auth.store';
import { AuthProvider } from '~/auth/types/auth.type';
import { useNotification } from '~shared/hooks/useNotification';

import { useGetMe } from './useGetMe';

export function useAuth() {
  const { showError } = useNotification();
  const auth = useAuthState();
  const setAuth = useSetAuth();

  const getMe = useGetMe({ enabled: false });

  // Initialize authentication state on mount
  useEffect(() => {
    const initializeAuth = async () => {
      // Only initialize if not already loaded
      if (auth.isLoaded) return;

      const token = jwtStorage.get();
      if (token) {
        // Token exists, try to get user data
        try {
          const response = await getMe.refetch();
          const user = response.data;
          if (user) {
            setAuth({ user });
          } else {
            setAuth({ user: undefined });
          }
        } catch (error) {
          console.error('Failed to initialize auth:', error);
          // Token might be invalid, clear it
          jwtStorage.clear();
          setAuth({ user: undefined });
        }
      } else {
        // No token, user is not authenticated
        setAuth({ user: undefined });
      }
    };

    initializeAuth();
  }, [auth.isLoaded, getMe, setAuth]);

  const isAuthenticated = async () => {
    if (auth.isLoaded && auth.user) {
      return true;
    }

    try {
      const response = await getMe.refetch();
      const user = response.data;

      if (user) {
        setAuth({ user });
        return true;
      } else {
        setAuth({ user: undefined });
        return false;
      }
    } catch (error) {
      console.error('Failed to fetch user:', error);
      setAuth({ user: undefined });
      return false;
    }
  };

  const redirectWithProvider = async (provider: AuthProvider) => {
    const { url } = await getAuthRedirectUrl(provider);
    window.location.href = url;
  };

  const signIn = async (
    info:
      | { provider: AuthProvider; code: string }
      | { email: string; password: string }
  ) => {
    if ('provider' in info) {
      const { provider, code } = info;
      await loginWithProvider(provider, code).catch(showError);
      const { data } = await getMe.refetch();
      setAuth({ user: data });

      return data;
    } else {
      const { email, password } = info;

      await loginWithPassword(email, password).catch(showError);

      const { data } = await getMe.refetch();

      setAuth({ user: data });

      return data;
    }
  };

  const signOut = async () => {
    await logout();
    setAuth({ user: undefined });
  };

  return Object.assign(auth, {
    isAuthenticated,
    redirectWithProvider,
    signIn,
    signOut,
  });
}
