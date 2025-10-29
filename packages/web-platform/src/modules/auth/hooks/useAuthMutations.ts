/**
 * Auth Mutations
 * TanStack Query mutations for authentication operations
 */

import { useMutation, type UseMutationOptions } from '@tanstack/react-query';

import type {
  EnableMfaDto,
  EnableMfaResponse,
  ForgotPasswordDto,
  MessageResponse,
  MfaSecretResponse,
  ResetPasswordDto,
  SignInDto,
  SignInResponse,
  SignUpDto,
  SignUpResponse,
  VerifyOtpDto,
  VerifyOtpResponse,
} from '~/auth/types';
import type { ApiError } from '~shared/api/client/api-client';

import { authApiService } from '~/auth/services/auth-api.service';

/**
 * Sign Up Mutation
 */
export function useSignUpMutation(
  options?: UseMutationOptions<SignUpResponse, ApiError, SignUpDto>
) {
  return useMutation<SignUpResponse, ApiError, SignUpDto>({
    mutationFn: authApiService.signUp,
    ...options,
  });
}

/**
 * Sign In Mutation
 */
export function useSignInMutation(
  options?: UseMutationOptions<SignInResponse, ApiError, SignInDto>
) {
  return useMutation<SignInResponse, ApiError, SignInDto>({
    mutationFn: authApiService.signIn,
    ...options,
  });
}

/**
 * Verify OTP Mutation
 */
export function useVerifyOtpMutation(
  options?: UseMutationOptions<VerifyOtpResponse, ApiError, VerifyOtpDto>
) {
  return useMutation<VerifyOtpResponse, ApiError, VerifyOtpDto>({
    mutationFn: authApiService.verifyOtp,
    ...options,
  });
}

/**
 * Forgot Password Mutation
 */
export function useForgotPasswordMutation(
  options?: UseMutationOptions<MessageResponse, ApiError, ForgotPasswordDto>
) {
  return useMutation<MessageResponse, ApiError, ForgotPasswordDto>({
    mutationFn: authApiService.forgotPassword,
    ...options,
  });
}

/**
 * Reset Password Mutation
 */
export function useResetPasswordMutation(
  options?: UseMutationOptions<MessageResponse, ApiError, ResetPasswordDto>
) {
  return useMutation<MessageResponse, ApiError, ResetPasswordDto>({
    mutationFn: authApiService.resetPassword,
    ...options,
  });
}

/**
 * Logout Mutation
 */
export function useLogoutMutation(
  options?: UseMutationOptions<MessageResponse, ApiError, void>
) {
  return useMutation<MessageResponse, ApiError, void>({
    mutationFn: authApiService.logout,
    ...options,
  });
}

/**
 * Verify Email Mutation
 */
export function useVerifyEmailMutation(
  options?: UseMutationOptions<MessageResponse, ApiError, string>
) {
  return useMutation<MessageResponse, ApiError, string>({
    mutationFn: authApiService.verifyEmail,
    ...options,
  });
}

/**
 * Generate MFA Secret Mutation
 */
export function useGenerateMfaSecretMutation(
  options?: UseMutationOptions<MfaSecretResponse, ApiError, void>
) {
  return useMutation<MfaSecretResponse, ApiError, void>({
    mutationFn: authApiService.generateMfaSecret,
    ...options,
  });
}

/**
 * Enable MFA Mutation
 */
export function useEnableMfaMutation(
  options?: UseMutationOptions<EnableMfaResponse, ApiError, EnableMfaDto>
) {
  return useMutation<EnableMfaResponse, ApiError, EnableMfaDto>({
    mutationFn: authApiService.enableMfa,
    ...options,
  });
}

/**
 * Disable MFA Mutation
 */
export function useDisableMfaMutation(
  options?: UseMutationOptions<MessageResponse, ApiError, void>
) {
  return useMutation<MessageResponse, ApiError, void>({
    mutationFn: authApiService.disableMfa,
    ...options,
  });
}
