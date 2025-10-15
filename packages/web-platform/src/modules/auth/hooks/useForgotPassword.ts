import { useState } from 'react';

type ForgotPasswordStep = 'initial' | 'otp' | 'reset';

type UseForgotPasswordReturn = {
  currentStep: ForgotPasswordStep;
  email: string;
  isLoading: boolean;
  isOpen: boolean;
  openForgotPassword: () => void;
  closeForgotPassword: () => void;
  handleSendOtp: (submittedEmail: string) => Promise<void>;
  handleVerifyOtp: (otp: string) => Promise<void>;
  handleResendOtp: () => Promise<void>;
  handleResetPassword: (password: string) => Promise<void>;
};

export function useForgotPassword(): UseForgotPasswordReturn {
  const [currentStep, setCurrentStep] = useState<ForgotPasswordStep>('initial');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const openForgotPassword = () => {
    setIsOpen(true);
    setCurrentStep('initial');
    setEmail('');
  };

  const closeForgotPassword = () => {
    setIsOpen(false);
    setCurrentStep('initial');
    setEmail('');
  };

  const handleSendOtp = async (submittedEmail: string) => {
    setIsLoading(true);
    try {
      // TODO: Call API to send OTP to email
      console.log('Sending OTP to:', submittedEmail);
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call

      setEmail(submittedEmail);
      setCurrentStep('otp');
    } catch (error) {
      console.error('Failed to send OTP:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async (otp: string) => {
    setIsLoading(true);
    try {
      // TODO: Call API to verify OTP
      console.log('Verifying OTP:', otp);
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call

      setCurrentStep('reset');
    } catch (error) {
      console.error('Failed to verify OTP:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    try {
      // TODO: Call API to resend OTP
      console.log('Resending OTP to:', email);
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
    } catch (error) {
      console.error('Failed to resend OTP:', error);
      throw error;
    }
  };

  const handleResetPassword = async (_password: string) => {
    setIsLoading(true);
    try {
      // TODO: Call API to reset password
      console.log('Resetting password for:', email);
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call

      closeForgotPassword();
      // Show success notification
      console.log('Password reset successful!');
    } catch (error) {
      console.error('Failed to reset password:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    currentStep,
    email,
    isLoading,
    isOpen,
    openForgotPassword,
    closeForgotPassword,
    handleSendOtp,
    handleVerifyOtp,
    handleResendOtp,
    handleResetPassword,
  };
}
