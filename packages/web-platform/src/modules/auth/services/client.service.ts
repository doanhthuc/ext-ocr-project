import { delay } from '@ocr-platform/shared';
import {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';

import {
  ERROR_NO_ACCESS_TOKEN_FOUND,
  REFRESH_TOKEN_ENDPOINT,
} from '~/auth/constants/auth.constant';
import {
  handleSessionExpired,
  refreshToken,
} from '~/auth/services/auth.service';
import { jwtStorage } from '~/auth/services/jwt-storage.service';
import { AuthClientState } from '~/auth/types/auth.type';
import { createBaseClient } from '~shared/utils/api-client.util';

// Fake user data for /user/me endpoint
const FAKE_USERS = [
  {
    id: '1',
    username: 'admin',
    email: 'admin@example.com',
    roles: ['admin'],
    name: 'Admin User',
    pictureUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin',
  },
  {
    id: '2',
    username: 'user',
    email: 'user@example.com',
    roles: ['user'],
    name: 'Regular User',
    pictureUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=user',
  },
] as const;

// --------- FAKE RESPONSE HANDLER ---------
async function handleFakeUserMeResponse(config: InternalAxiosRequestConfig) {
  if (config.url === '/user/me' && config.method?.toLowerCase() === 'get') {
    await delay(300);

    const token = jwtStorage.get();
    if (!token) {
      throw new Error('No access token found');
    }

    // Extract user ID from fake token
    const tokenParts = token.split('_');
    const userId = tokenParts[3];
    const user = FAKE_USERS.find(u => u.id === userId);

    if (!user) {
      throw new Error('User not found');
    }

    // Return fake axios response structure
    return Promise.resolve({
      data: user,
      status: 200,
      statusText: 'OK',
      headers: {},
      config,
    });
  }
  return null;
}

// --------- REQUESTS INTERCEPTORS ---------
async function ensureRefreshTokenCompleted(
  _config: InternalAxiosRequestConfig,
  state: AuthClientState
) {
  const accessToken = jwtStorage.get();
  if (!accessToken) {
    state.refreshToken ??= refreshToken();
  }
  await state.refreshToken;
  state.refreshToken = null;
}

async function attachAccessToken(
  config: InternalAxiosRequestConfig,
  _state: AuthClientState
) {
  const accessToken = jwtStorage.get();

  if (!accessToken) {
    console.error(ERROR_NO_ACCESS_TOKEN_FOUND);
    throw new Error(ERROR_NO_ACCESS_TOKEN_FOUND);
  }

  config.headers['Authorization'] = `Bearer ${accessToken}`;
}

// --------- RESPONSE INTERCEPTORS ---------
function handleError401(
  error: AxiosError | AxiosResponse,
  client: AxiosInstance,
  state: AuthClientState
) {
  const originalRequest: InternalAxiosRequestConfig & { _hasRetry?: boolean } =
    error.config!;

  if (originalRequest.url === REFRESH_TOKEN_ENDPOINT) {
    return handleSessionExpired();
  }

  if (originalRequest._hasRetry) {
    return Promise.reject(error);
  }

  state.refreshToken ??= refreshToken();
  originalRequest._hasRetry = true;

  return client(originalRequest);
}

// -----------------------------------------
function createAuthClient() {
  const client = createBaseClient();
  const state: AuthClientState = { refreshToken: null };

  client.interceptors.request.use(
    async config => {
      // Check if this is a fake request we should handle
      const fakeResponse = await handleFakeUserMeResponse(config);
      if (fakeResponse) {
        // Return the fake response directly instead of continuing with the request
        return Promise.reject({
          response: fakeResponse,
          config,
          isAxiosError: true,
          _isFakeResponse: true,
        });
      }

      await ensureRefreshTokenCompleted(config, state);
      await attachAccessToken(config, state).catch(error =>
        Promise.reject(error)
      );

      return config;
    },
    error => Promise.reject(error)
  );

  client.interceptors.response.use(
    response => response,
    error => {
      // Handle fake responses
      if (error._isFakeResponse) {
        return Promise.resolve(error.response);
      }

      switch (error.response?.status) {
        case 401:
          return handleError401(error, client, state);

        case 400:
        case 403:
        default:
          return Promise.reject(error);
      }
    }
  );

  return client;
}

export const authClient = createAuthClient();
