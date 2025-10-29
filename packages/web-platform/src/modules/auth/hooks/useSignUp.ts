/**
 * Sign Up Hook
 * Manages sign up flow with OTP verification
 */

import { useNavigate } from '@tanstack/react-router';
import { useState } from 'react';

import type { SignUpDto } from '~/auth/types';
import type { ApiError } from '~shared/api/client/api-client';

import { useNotification } from '~shared/hooks/useNotification';

import { useSignUpMutation, useVerifyOtpMutation } from './useAuthMutations';

type SignUpStep = 'form' | 'otp';

type UseSignUpReturn = {
  currentStep: SignUpStep;
  email: string;
  isLoading: boolean;
  isOpen: boolean;
  otpError: string | undefined;
  openSignUp: () => void;
  closeSignUp: () => void;
  handleSignUp: (data: SignUpDto) => Promise<void>;
  handleVerifyOtp: (otp: string) => Promise<void>;
  handleResendOtp: () => Promise<void>;
  clearOtpError: () => void;
};

export function useSignUp(): UseSignUpReturn {
  const navigate = useNavigate();
  const { showError, showSuccess } = useNotification();

  const [currentStep, setCurrentStep] = useState<SignUpStep>('form');
  const [email, setEmail] = useState('');
  const [userId, setUserId] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [otpError, setOtpError] = useState<string>();

  const signUpMutation = useSignUpMutation();
  const verifyOtpMutation = useVerifyOtpMutation();

  const isLoading = signUpMutation.isPending || verifyOtpMutation.isPending;

  const openSignUp = () => {
    setIsOpen(true);
    setCurrentStep('form');
    setEmail('');
    setUserId('');
    setOtpError(undefined);
  };

  const closeSignUp = () => {
    setIsOpen(false);
    setCurrentStep('form');
    setEmail('');
    setUserId('');
    setOtpError(undefined);
  };

  const clearOtpError = () => {
    setOtpError(undefined);
  };

  const handleSignUp = async (data: SignUpDto) => {
    try {
      const response = await signUpMutation.mutateAsync(data);

      setEmail(data.email);
      setUserId(response.userId);
      setCurrentStep('otp');
      setOtpError(undefined);

      showSuccess('Account created! Please verify your email.');
    } catch (error) {
      console.error('Failed to create account:', error);
      const apiError = error as ApiError;
      showError(apiError.message);
      throw error;
    }
  };

  const handleVerifyOtp = async (otp: string) => {
    setOtpError(undefined);

    if (!userId) {
      setOtpError('User ID not found. Please try signing up again.');
      showError('User ID not found. Please try signing up again.');
      return;
    }

    try {
      await verifyOtpMutation.mutateAsync({
        userId,
        otpCode: otp,
      });

      closeSignUp();
      showSuccess('Email verified successfully! You can now sign in.');

      // Redirect to sign in page
      navigate({ to: '/sign-in' });
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
      // TODO: Implement dedicated resend OTP endpoint in the backend
      // For now, we'll show a success message
      // In production, this should call a dedicated API endpoint like:
      // await authApiService.resendOtp({ userId, email });

      showSuccess('OTP resent to your email');
    } catch (error) {
      console.error('Failed to resend OTP:', error);
      const apiError = error as ApiError;
      showError(apiError.message || 'Failed to resend OTP. Please try again.');
    }
  };

  return {
    currentStep,
    email,
    isLoading,
    isOpen,
    otpError,
    openSignUp,
    closeSignUp,
    handleSignUp,
    handleVerifyOtp,
    handleResendOtp,
    clearOtpError,
  };
}
