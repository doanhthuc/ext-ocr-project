import {
  ForgotPasswordModal,
  OtpVerificationModal,
  ResetPasswordModal,
} from '~/auth/components';
import { useForgotPassword } from '~/auth/hooks';

type ForgotPasswordFlowProps = {
  onTriggerOpen: (handler: () => void) => void;
};

export function ForgotPasswordFlow({ onTriggerOpen }: ForgotPasswordFlowProps) {
  const {
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
  } = useForgotPassword();

  // Expose the open function to parent component
  onTriggerOpen(openForgotPassword);

  return (
    <>
      {currentStep === 'initial' && (
        <ForgotPasswordModal
          isOpen={isOpen}
          onClose={closeForgotPassword}
          onConfirm={handleSendOtp}
          loading={isLoading}
        />
      )}

      {currentStep === 'otp' && (
        <OtpVerificationModal
          isOpen={isOpen}
          onClose={closeForgotPassword}
          onConfirm={handleVerifyOtp}
          email={email}
          loading={isLoading}
          onResend={handleResendOtp}
        />
      )}

      {currentStep === 'reset' && (
        <ResetPasswordModal
          isOpen={isOpen}
          onClose={closeForgotPassword}
          onConfirm={handleResetPassword}
          loading={isLoading}
        />
      )}
    </>
  );
}
