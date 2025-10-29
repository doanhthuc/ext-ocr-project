/**
 * Auth API Types
 */

// ============================================================================
// Auth DTOs (Request Types)
// ============================================================================

export type SignUpDto = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

export type SignInDto = {
  email: string;
  password: string;
};

export type VerifyOtpDto = {
  userId: string;
  otpCode: string;
};

export type ForgotPasswordDto = {
  email: string;
};

export type ResetPasswordDto = {
  token: string;
  password: string;
};

export type RefreshTokenDto = {
  userId: string;
  refreshToken: string;
};

export type EnableMfaDto = {
  secret: string;
  token: string;
};

// ============================================================================
// Auth Responses
// ============================================================================

export type SignUpResponse = {
  message: string;
  userId: string;
};

export type SignInResponse = {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
  };
};

export type VerifyOtpResponse = {
  accessToken: string;
  refreshToken: string;
  user: Record<string, unknown>;
};

export type RefreshTokenResponse = {
  accessToken: string;
  refreshToken: string;
};

export type MfaSecretResponse = {
  secret: string;
  qrCode: string;
};

export type EnableMfaResponse = {
  message: string;
  backupCodes: Array<string>;
};

export type MessageResponse = {
  message: string;
};
