export const AUTH_PROVIDER = {
  Google: 'google',
} as const;

export const USER_ROLE = {
  Admin: 'admin',
  User: 'user',
};

export const REFRESH_TOKEN_ENDPOINT = '/auth/refresh-token';

export const ACCESS_TOKEN_KEY = 'access-token';
export const REFRESH_TOKEN_KEY = 'refresh-token';

export const ERROR_NO_ACCESS_TOKEN_FOUND = '[ATLAS]: No access token found!';
