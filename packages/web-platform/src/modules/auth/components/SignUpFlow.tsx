import { OtpVerificationModal, SignUpModal } from '~/auth/components';
import { useSignUp } from '~/auth/hooks';

type SignUpFlowProps = {
  onTriggerOpen: (handler: () => void) => void;
};

export function SignUpFlow({ onTriggerOpen }: SignUpFlowProps) {
  const {
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
  } = useSignUp();

  // Expose the open function to parent component
  onTriggerOpen(openSignUp);

  return (
    <>
      {currentStep === 'form' && (
        <SignUpModal
          isOpen={isOpen}
          onClose={closeSignUp}
          onSignUp={handleSignUp}
          loading={isLoading}
        />
      )}

      {currentStep === 'otp' && (
        <OtpVerificationModal
          isOpen={isOpen}
          onClose={closeSignUp}
          onConfirm={handleVerifyOtp}
          email={email}
          loading={isLoading}
          onResend={handleResendOtp}
          error={otpError}
        />
      )}
    </>
  );
}
