import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

import { AuthStore } from '~/auth/types/auth.type';

type AuthState = AuthStore & {
  setAuth: (payload: Partial<Omit<AuthStore, 'isLoaded'>>) => void;
};

export const useAuthStore = create<AuthState>()(
  subscribeWithSelector(set => ({
    user: undefined,
    isLoaded: false,
    setAuth: payload => {
      set({ user: payload.user, isLoaded: true });
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
