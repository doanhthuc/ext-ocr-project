import { useRef } from 'react';

import { ForgotPasswordFlow, SignInForm, SignUpFlow } from '~/auth/components';
import { AuthBanner } from '~shared/components';

export function SignInPage() {
  // Refs to store flow trigger functions
  const forgotPasswordTrigger = useRef<(() => void) | null>(null);
  const signUpTrigger = useRef<(() => void) | null>(null);

  const handleForgotPassword = () => {
    forgotPasswordTrigger.current?.();
  };

  const handleSignUp = () => {
    signUpTrigger.current?.();
  };

  return (
    <div className="grid h-screen grid-cols-[1fr_2fr] px-10 py-10">
      <AuthBanner />

      <SignInForm
        onForgotPassword={handleForgotPassword}
        onSignUp={handleSignUp}
      />

      {/* Forgot Password Flow */}
      <ForgotPasswordFlow
        onTriggerOpen={handler => {
          forgotPasswordTrigger.current = handler;
        }}
      />

      {/* Sign Up Flow */}
      <SignUpFlow
        onTriggerOpen={handler => {
          signUpTrigger.current = handler;
        }}
      />
    </div>
  );
}
