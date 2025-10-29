/**
 * Auth Hook
 * Comprehensive hook for authentication operations
 * Integrates with new API mutations and auth store
 */

import { useNavigate } from '@tanstack/react-router';
import { useCallback, useEffect } from 'react';

import type { SignInDto, SignUpDto } from '~/auth/types';
import type { AuthProvider } from '~/auth/types/auth.type';
import type { ApiError } from '~shared/api/client/api-client';

import { jwtStorageService } from '~/auth/services/jwt-storage.service';
import {
  useAuthState,
  useIsAuthenticated,
  useSetAuth,
  useSignIn as useSignInStore,
  useSignOut as useSignOutStore,
} from '~/auth/stores/auth.store';
import { useNotification } from '~shared/hooks/useNotification';

import {
  useLogoutMutation,
  useSignInMutation,
  useSignUpMutation,
} from './useAuthMutations';
import { useGetMe } from './useGetMe';

export function useAuth() {
  const navigate = useNavigate();
  const { showError, showSuccess } = useNotification();
  const auth = useAuthState();
  const setAuth = useSetAuth();
  const signInStore = useSignInStore();
  const signOutStore = useSignOutStore();
  const isAuthenticatedStore = useIsAuthenticated();

  const getMe = useGetMe({ enabled: false });

  // Mutations
  const signUpMutation = useSignUpMutation();
  const signInMutation = useSignInMutation();
  const logoutMutation = useLogoutMutation();

  // Initialize authentication state on mount
  useEffect(() => {
    const initializeAuth = async () => {
      // Only initialize if not already loaded
      if (auth.isLoaded) return;

      const token = jwtStorageService.getAccessToken();
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
          jwtStorageService.clearTokens();
          setAuth({ user: undefined });
        }
      } else {
        // No token, user is not authenticated
        setAuth({ user: undefined });
      }
    };

    initializeAuth();
  }, [auth.isLoaded, getMe, setAuth]);

  /**
   * Check if user is authenticated
   */
  const isAuthenticated = useCallback(() => {
    return isAuthenticatedStore();
  }, [isAuthenticatedStore]);

  /**
   * Redirect to OAuth provider
   */
  const redirectWithProvider = useCallback(async (provider: AuthProvider) => {
    // TODO: Implement OAuth redirect with new API
    const url = `/oauth2/${provider}/authorize`;
    window.location.href = url;
  }, []);

  /**
   * Sign up new user
   */
  const signUp = useCallback(
    async (data: SignUpDto) => {
      try {
        const response = await signUpMutation.mutateAsync(data);
        showSuccess(response.message);
        return response;
      } catch (error) {
        const apiError = error as ApiError;
        showError(apiError.message);
        throw error;
      }
    },
    [signUpMutation, showSuccess, showError]
  );

  /**
   * Sign in user
   */
  const signIn = useCallback(
    async (
      info:
        | { provider: AuthProvider; code: string }
        | { email: string; password: string }
    ) => {
      if ('provider' in info) {
        // OAuth sign in
        // TODO: Implement OAuth sign in with new API
        const { data } = await getMe.refetch();
        if (data) {
          setAuth({ user: data });
        }
        return data;
      } else {
        // Email/password sign in
        const { email, password } = info;
        try {
          const response = await signInMutation.mutateAsync({
            email,
            password,
          } as SignInDto);

          // Save tokens and update store
          signInStore(response);

          // Fetch user profile
          const { data } = await getMe.refetch();
          if (data) {
            setAuth({ user: data });
          }

          return data;
        } catch (error) {
          const apiError = error as ApiError;
          showError(apiError.message);
          throw error;
        }
      }
    },
    [signInMutation, signInStore, getMe, setAuth, showError]
  );

  /**
   * Sign out user
   */
  const signOut = useCallback(async () => {
    try {
      await logoutMutation.mutateAsync();
    } catch (error) {
      // Even if logout API fails, clear local state
      console.error('Logout API failed:', error);
    } finally {
      signOutStore();
      navigate({ to: '/sign-in' });
    }
  }, [logoutMutation, signOutStore, navigate]);

  return Object.assign(auth, {
    // Auth state
    isAuthenticated,

    // Actions
    redirectWithProvider,
    signUp,
    signIn,
    signOut,

    // Loading states
    isSigningUp: signUpMutation.isPending,
    isSigningIn: signInMutation.isPending,
    isSigningOut: logoutMutation.isPending,

    // Errors
    signUpError: signUpMutation.error,
    signInError: signInMutation.error,
    signOutError: logoutMutation.error,
  });
}
