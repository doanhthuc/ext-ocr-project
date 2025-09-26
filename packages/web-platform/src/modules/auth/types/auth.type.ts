import { Maybe } from '@ocr-platform/shared';

import { AUTH_PROVIDER, USER_ROLE } from '~/auth/constants';

export type UserResponse = {
  id: string;
  username: string;
  email: string;
  roles: Array<string>;
  name?: string;
  pictureUrl?: string;
};

export type LoginResponse = {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
};

export type RefreshTokenResponse = {
  roles: Array<string>;
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
};

export type AuthClientState = {
  refreshToken: Promise<RefreshTokenResponse | null> | null;
};

export type AuthProvider = (typeof AUTH_PROVIDER)[keyof typeof AUTH_PROVIDER];
export type UserRole = (typeof USER_ROLE)[keyof typeof USER_ROLE];

export type AuthStore = {
  user: Maybe<UserResponse>;
  isLoaded: boolean;
};
