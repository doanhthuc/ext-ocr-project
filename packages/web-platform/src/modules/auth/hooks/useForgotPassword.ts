import { useNavigate } from '@tanstack/react-router';
import { useState } from 'react';

import type { ApiError } from '~shared/api/client/api-client';

import { useNotification } from '~shared/hooks/useNotification';

import {
  useForgotPasswordMutation,
  useResetPasswordMutation,
} from './useAuthMutations';

type ForgotPasswordStep = 'initial' | 'otp' | 'reset';

type UseForgotPasswordReturn = {
  currentStep: ForgotPasswordStep;
  email: string;
  isLoading: boolean;
  isOpen: boolean;
  otpError: string | undefined;
  openForgotPassword: () => void;
  closeForgotPassword: () => void;
  handleSendOtp: (submittedEmail: string) => Promise<void>;
  handleVerifyOtp: (otp: string) => Promise<void>;
  handleResendOtp: () => Promise<void>;
  handleResetPassword: (password: string) => Promise<void>;
  clearOtpError: () => void;
};

export function useForgotPassword(): UseForgotPasswordReturn {
  const navigate = useNavigate();
  const { showError, showSuccess } = useNotification();

  const [currentStep, setCurrentStep] = useState<ForgotPasswordStep>('initial');
  const [email, setEmail] = useState('');
  const [resetToken, setResetToken] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [otpError, setOtpError] = useState<string>();

  const forgotPasswordMutation = useForgotPasswordMutation();
  const resetPasswordMutation = useResetPasswordMutation();

  const isLoading =
    forgotPasswordMutation.isPending || resetPasswordMutation.isPending;

  const openForgotPassword = () => {
    setIsOpen(true);
    setCurrentStep('initial');
    setEmail('');
    setResetToken('');
    setOtpError(undefined);
  };

  const closeForgotPassword = () => {
    setIsOpen(false);
    setCurrentStep('initial');
    setEmail('');
    setResetToken('');
    setOtpError(undefined);
  };

  const clearOtpError = () => {
    setOtpError(undefined);
  };

  const handleSendOtp = async (submittedEmail: string) => {
    try {
      const response = await forgotPasswordMutation.mutateAsync({
        email: submittedEmail,
      });

      setEmail(submittedEmail);
      setCurrentStep('otp');

      showSuccess(
        response.message || 'If the email exists, a reset link has been sent.'
      );
    } catch (error) {
      console.error('Failed to send OTP:', error);
      const apiError = error as ApiError;
      showError(apiError.message);
      throw error;
    }
  };

  const handleVerifyOtp = async (otp: string) => {
    setOtpError(undefined);
    try {
      // Store the OTP as reset token for the next step
      setResetToken(otp);
      setCurrentStep('reset');
      showSuccess('OTP verified successfully');
    } catch (error) {
      console.error('Failed to verify OTP:', error);
      const apiError = error as ApiError;
      setOtpError(apiError.message || 'Incorrect OTP. Please try again.');
      showError(apiError.message || 'Failed to verify OTP. Please try again.');
    }
  };

  const handleResendOtp = async () => {
    setOtpError(undefined);
    try {
      const response = await forgotPasswordMutation.mutateAsync({ email });
      showSuccess(response.message || 'OTP resent to your email');
    } catch (error) {
      console.error('Failed to resend OTP:', error);
      const apiError = error as ApiError;
      showError(apiError.message || 'Failed to resend OTP. Please try again.');
    }
  };

  const handleResetPassword = async (password: string) => {
    try {
      const response = await resetPasswordMutation.mutateAsync({
        token: resetToken,
        password,
      });

      closeForgotPassword();
      showSuccess(response.message || 'Password reset successfully');

      // Redirect to sign in page
      navigate({ to: '/sign-in' });
    } catch (error) {
      console.error('Failed to reset password:', error);
      const apiError = error as ApiError;
      showError(apiError.message);
      throw error;
    }
  };

  return {
    currentStep,
    email,
    isLoading,
    isOpen,
    otpError,
    openForgotPassword,
    closeForgotPassword,
    handleSendOtp,
    handleVerifyOtp,
    handleResendOtp,
    handleResetPassword,
    clearOtpError,
  };
}
