import { useState } from 'react';

type SignUpStep = 'form' | 'otp';

type UseSignUpReturn = {
  currentStep: SignUpStep;
  email: string;
  isLoading: boolean;
  isOpen: boolean;
  otpError: string | undefined;
  openSignUp: () => void;
  closeSignUp: () => void;
  handleSignUp: (data: { email: string; password: string }) => Promise<void>;
  handleVerifyOtp: (otp: string) => Promise<void>;
  handleResendOtp: () => Promise<void>;
  clearOtpError: () => void;
};

export function useSignUp(): UseSignUpReturn {
  const [currentStep, setCurrentStep] = useState<SignUpStep>('form');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [otpError, setOtpError] = useState<string>();

  const openSignUp = () => {
    setIsOpen(true);
    setCurrentStep('form');
    setEmail('');
    setOtpError(undefined);
  };

  const closeSignUp = () => {
    setIsOpen(false);
    setCurrentStep('form');
    setEmail('');
    setOtpError(undefined);
  };

  const clearOtpError = () => {
    setOtpError(undefined);
  };

  const handleSignUp = async (data: { email: string; password: string }) => {
    setIsLoading(true);
    try {
      // TODO: Call API to create account and send OTP
      console.log('Creating account with:', data);
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call

      setEmail(data.email);
      setCurrentStep('otp');
      setOtpError(undefined);
    } catch (error) {
      console.error('Failed to create account:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async (otp: string) => {
    setIsLoading(true);
    setOtpError(undefined);
    try {
      // TODO: Call API to verify OTP and complete sign up
      console.log('Verifying sign-up OTP:', otp);
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call

      // Simulate OTP verification error for demo
      // In production, this would come from the API response
      const isValid = otp === '1234'; // Demo: only accept '1234'
      if (!isValid) {
        setOtpError('Incorrect OTP. Please try again.');
        return;
      }

      closeSignUp();
      // Show success notification and redirect to dashboard
      console.log('Sign up successful!');
    } catch (error) {
      console.error('Failed to verify OTP:', error);
      setOtpError('Incorrect OTP. Please try again.');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setOtpError(undefined);
    try {
      // TODO: Call API to resend OTP
      console.log('Resending sign-up OTP to:', email);
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
    } catch (error) {
      console.error('Failed to resend OTP:', error);
      throw error;
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
