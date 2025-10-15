import type { Meta, StoryObj } from '@storybook/react';

import { useState } from 'react';

import { OtpVerificationModal } from './OtpVerificationModal';

const meta: Meta<typeof OtpVerificationModal> = {
  title: 'Auth/OtpVerificationModal',
  component: OtpVerificationModal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof OtpVerificationModal>;

function OtpVerificationModalWrapper({
  loading = false,
  email = 'chinlk.design@gmail.com',
  error,
}: {
  loading?: boolean;
  email?: string;
  error?: string;
}) {
  const [isOpen, setIsOpen] = useState(true);

  const handleConfirm = (otp: string) => {
    console.log('OTP submitted:', otp);
    setIsOpen(false);
    // Reopen after a short delay for demo purposes
    setTimeout(() => {
      setIsOpen(true);
    }, 1000);
  };

  const handleResend = () => {
    console.log('Resend OTP clicked');
  };

  return (
    <OtpVerificationModal
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      onConfirm={handleConfirm}
      email={email}
      loading={loading}
      onResend={handleResend}
      error={error}
    />
  );
}

export const Default: Story = {
  render: () => <OtpVerificationModalWrapper />,
  parameters: {
    docs: {
      description: {
        story:
          'Default OTP verification modal with 4-digit input fields. Users can enter the verification code sent to their email.',
      },
    },
  },
};

export const WithError: Story = {
  render: () => (
    <OtpVerificationModalWrapper error="Incorrect OTP. Please try again." />
  ),
  parameters: {
    docs: {
      description: {
        story:
          'OTP verification modal showing an error message when incorrect OTP is entered.',
      },
    },
  },
};

export const LoadingState: Story = {
  render: () => <OtpVerificationModalWrapper loading={true} />,
  parameters: {
    docs: {
      description: {
        story: 'OTP verification modal showing loading state while verifying the code.',
      },
    },
  },
};

export const WithLongEmail: Story = {
  render: () => (
    <OtpVerificationModalWrapper email="very.long.email.address@example.com" />
  ),
  parameters: {
    docs: {
      description: {
        story:
          'OTP verification modal with a long email address to test text wrapping.',
      },
    },
  },
};
