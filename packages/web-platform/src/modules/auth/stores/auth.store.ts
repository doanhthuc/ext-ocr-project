/**
 * Auth Store
 * Zustand store for authentication state management
 */

import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

import type { SignInResponse } from '~/auth/types';
import type { AuthStore } from '~/auth/types/auth.type';

import { jwtStorageService } from '~/auth/services/jwt-storage.service';

type AuthState = AuthStore & {
  setAuth: (payload: Partial<Omit<AuthStore, 'isLoaded'>>) => void;
  signIn: (response: SignInResponse) => void;
  signOut: () => void;
  isAuthenticated: () => boolean;
};

export const useAuthStore = create<AuthState>()(
  subscribeWithSelector(set => ({
    user: undefined,
    isLoaded: false,

    setAuth: payload => {
      set({ user: payload.user, isLoaded: true });
    },

    /**
     * Sign in user and save tokens
     */
    signIn: response => {
      // Save tokens to localStorage
      jwtStorageService.setTokens({
        accessToken: response.accessToken,
        refreshToken: response.refreshToken,
        userId: response.user.id,
      });

      // Update store with user data
      set({
        user: {
          id: response.user.id,
          username: response.user.email.split('@')[0], // Generate username from email
          email: response.user.email,
          name: `${response.user.firstName} ${response.user.lastName}`,
          roles: [], // Will be populated from JWT or API
        },
        isLoaded: true,
      });
    },

    /**
     * Sign out user and clear tokens
     */
    signOut: () => {
      jwtStorageService.clearTokens();
      set({ user: undefined, isLoaded: false });
    },

    /**
     * Check if user is authenticated
     */
    isAuthenticated: () => {
      return jwtStorageService.isAuthenticated();
    },
  }))
);

// Use separate selectors to avoid infinite re-renders
export const useAuthState = () => {
  const user = useAuthStore(state => state.user);
  const isLoaded = useAuthStore(state => state.isLoaded);
  return { user, isLoaded };
};

export const useSetAuth = () => useAuthStore(state => state.setAuth);

export const useSignIn = () => useAuthStore(state => state.signIn);

export const useSignOut = () => useAuthStore(state => state.signOut);

export const useIsAuthenticated = () =>
  useAuthStore(state => state.isAuthenticated);
