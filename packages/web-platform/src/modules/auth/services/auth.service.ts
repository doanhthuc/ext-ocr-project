import { delay } from '@ocr-platform/shared';

import { REFRESH_TOKEN_KEY } from '~/auth/constants/auth.constant';
import { jwtStorage } from '~/auth/services/jwt-storage.service';
import {
  AuthProvider,
  LoginResponse,
  RefreshTokenResponse,
} from '~/auth/types/auth.type';

// Fake user data for testing
const FAKE_USERS = [
  {
    id: '1',
    username: 'admin',
    email: 'admin@example.com',
    password: 'admin123',
    roles: ['admin'],
    name: 'Admin User',
    pictureUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin',
  },
  {
    id: '2',
    username: 'user',
    email: 'user@example.com',
    password: 'user123',
    roles: ['user'],
    name: 'Regular User',
    pictureUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=user',
  },
] as const;

const generateFakeToken = (userId: string) => {
  return `fake_access_token_${userId}_${Date.now()}`;
};

const generateFakeRefreshToken = (userId: string) => {
  return `fake_refresh_token_${userId}_${Date.now()}`;
};

export async function getAuthRedirectUrl(provider: AuthProvider) {
  await delay(500);
  return {
    url: `https://fake-auth-provider.com/${provider}?redirect=http://localhost:3001`,
  };
}

export async function loginWithProvider(
  _provider: AuthProvider,
  _code: string
) {
  await delay(800);

  // Simulate provider login - use admin user for demo
  const user = FAKE_USERS[0];
  const data: LoginResponse = {
    accessToken: generateFakeToken(user.id),
    refreshToken: generateFakeRefreshToken(user.id),
    expiresIn: 3600,
  };

  jwtStorage.set(data.accessToken);
  localStorage.setItem(REFRESH_TOKEN_KEY, data.refreshToken);

  return data;
}

export async function loginWithPassword(email: string, password: string) {
  await delay(800);

  const user = FAKE_USERS.find(
    u => u.email === email && u.password === password
  );

  if (!user) {
    throw new Error('Invalid email or password');
  }

  const data: LoginResponse = {
    accessToken: generateFakeToken(user.id),
    refreshToken: generateFakeRefreshToken(user.id),
    expiresIn: 3600,
  };

  jwtStorage.set(data.accessToken);
  localStorage.setItem(REFRESH_TOKEN_KEY, data.refreshToken);

  return data;
}

export async function refreshToken() {
  try {
    const refreshTokenValue = localStorage.getItem(REFRESH_TOKEN_KEY);

    if (!refreshTokenValue) return null;

    await delay(300);

    // Extract user ID from fake refresh token
    const tokenParts = refreshTokenValue.split('_');
    const userId = tokenParts[4];
    const user = FAKE_USERS.find(u => u.id === userId);

    if (!user) {
      throw new Error('Invalid refresh token');
    }

    const data: RefreshTokenResponse = {
      roles: [...user.roles],
      accessToken: generateFakeToken(user.id),
      refreshToken: generateFakeRefreshToken(user.id),
      expiresIn: 3600,
    };

    jwtStorage.set(data.accessToken);
    localStorage.setItem(REFRESH_TOKEN_KEY, data.refreshToken);

    return data;
  } catch (error) {
    handleSessionExpired();
    window.location.href = '/sign-in';
    throw error;
  }
}

export async function logout() {
  await delay(300);

  const data = { message: 'Successfully logged out' };

  handleSessionExpired();

  window.location.href = '/';
  return data;
}

export function handleSessionExpired() {
  jwtStorage.clear();
  localStorage.removeItem(REFRESH_TOKEN_KEY);
}
