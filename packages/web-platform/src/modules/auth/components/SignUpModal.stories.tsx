import type { Meta, StoryObj } from '@storybook/react';

import { useState } from 'react';

import { SignUpModal } from './SignUpModal';

const meta: Meta<typeof SignUpModal> = {
  title: 'Auth/SignUpModal',
  component: SignUpModal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof SignUpModal>;

function SignUpModalWrapper({ loading = false }: { loading?: boolean }) {
  const [isOpen, setIsOpen] = useState(true);

  const handleSignUp = (data: { email: string; password: string }) => {
    console.log('Sign up submitted:', data);
    setIsOpen(false);
    // Reopen after a short delay for demo purposes
    setTimeout(() => {
      setIsOpen(true);
    }, 1000);
  };

  return (
    <SignUpModal
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      onSignUp={handleSignUp}
      loading={loading}
    />
  );
}

export const Default: Story = {
  render: () => <SignUpModalWrapper />,
  parameters: {
    docs: {
      description: {
        story:
          'Default sign-up modal with email and password fields. Uses react-hook-form with zod validation. Shows validation errors when fields are empty or email is invalid.',
      },
    },
  },
};

export const LoadingState: Story = {
  render: () => <SignUpModalWrapper loading={true} />,
  parameters: {
    docs: {
      description: {
        story: 'Sign-up modal showing loading state while creating the account.',
      },
    },
  },
};
