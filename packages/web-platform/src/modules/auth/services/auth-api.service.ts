/**
 * Auth API Service
 * All authentication-related API calls
 */

import type {
  EnableMfaDto,
  EnableMfaResponse,
  ForgotPasswordDto,
  MessageResponse,
  MfaSecretResponse,
  RefreshTokenDto,
  RefreshTokenResponse,
  ResetPasswordDto,
  SignInDto,
  SignInResponse,
  SignUpDto,
  SignUpResponse,
  VerifyOtpDto,
  VerifyOtpResponse,
} from '~/auth/types';

import { apiClient } from '~shared/api/client/api-client';
import { API_PATHS } from '~shared/api/constants/api-paths';

export const authApiService = {
  /**
   * Register a new user
   */
  signUp: async (data: SignUpDto): Promise<SignUpResponse> => {
    const response = await apiClient.post<SignUpResponse>(
      API_PATHS.AUTH.SIGN_UP,
      data
    );
    return response.data;
  },

  /**
   * Sign in user
   */
  signIn: async (data: SignInDto): Promise<SignInResponse> => {
    const response = await apiClient.post<SignInResponse>(
      API_PATHS.AUTH.SIGN_IN,
      data
    );
    return response.data;
  },

  /**
   * Verify OTP for MFA
   */
  verifyOtp: async (data: VerifyOtpDto): Promise<VerifyOtpResponse> => {
    const response = await apiClient.post<VerifyOtpResponse>(
      API_PATHS.AUTH.VERIFY_OTP,
      data
    );
    return response.data;
  },

  /**
   * Request password reset
   */
  forgotPassword: async (data: ForgotPasswordDto): Promise<MessageResponse> => {
    const response = await apiClient.post<MessageResponse>(
      API_PATHS.AUTH.FORGOT_PASSWORD,
      data
    );
    return response.data;
  },

  /**
   * Reset password with token
   */
  resetPassword: async (data: ResetPasswordDto): Promise<MessageResponse> => {
    const response = await apiClient.post<MessageResponse>(
      API_PATHS.AUTH.RESET_PASSWORD,
      data
    );
    return response.data;
  },

  /**
   * Refresh access token
   */
  refreshTokens: async (
    data: RefreshTokenDto
  ): Promise<RefreshTokenResponse> => {
    const response = await apiClient.post<RefreshTokenResponse>(
      API_PATHS.AUTH.REFRESH,
      data
    );
    return response.data;
  },

  /**
   * Logout user
   */
  logout: async (): Promise<MessageResponse> => {
    const response = await apiClient.post<MessageResponse>(
      API_PATHS.AUTH.LOGOUT
    );
    return response.data;
  },

  /**
   * Verify email address
   */
  verifyEmail: async (token: string): Promise<MessageResponse> => {
    const response = await apiClient.get<MessageResponse>(
      API_PATHS.AUTH.VERIFY_EMAIL,
      {
        params: { token },
      }
    );
    return response.data;
  },

  /**
   * Generate MFA secret
   */
  generateMfaSecret: async (): Promise<MfaSecretResponse> => {
    const response = await apiClient.get<MfaSecretResponse>(
      API_PATHS.AUTH.MFA.GENERATE_SECRET
    );
    return response.data;
  },

  /**
   * Enable MFA
   */
  enableMfa: async (data: EnableMfaDto): Promise<EnableMfaResponse> => {
    const response = await apiClient.post<EnableMfaResponse>(
      API_PATHS.AUTH.MFA.ENABLE,
      data
    );
    return response.data;
  },

  /**
   * Disable MFA
   */
  disableMfa: async (): Promise<MessageResponse> => {
    const response = await apiClient.post<MessageResponse>(
      API_PATHS.AUTH.MFA.DISABLE
    );
    return response.data;
  },
};
