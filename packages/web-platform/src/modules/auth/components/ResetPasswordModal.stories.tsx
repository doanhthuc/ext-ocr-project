import type { Meta, StoryObj } from '@storybook/react';

import { useState } from 'react';

import { ResetPasswordModal } from './ResetPasswordModal';

const meta: Meta<typeof ResetPasswordModal> = {
  title: 'Auth/ResetPasswordModal',
  component: ResetPasswordModal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ResetPasswordModal>;

function ResetPasswordModalWrapper({ loading = false }: { loading?: boolean }) {
  const [isOpen, setIsOpen] = useState(true);

  const handleConfirm = () => {
    console.log('Password reset submitted');
    setIsOpen(false);
    // Reopen after a short delay for demo purposes
    setTimeout(() => {
      setIsOpen(true);
    }, 1000);
  };

  return (
    <ResetPasswordModal
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      onConfirm={handleConfirm}
      loading={loading}
    />
  );
}

export const Default: Story = {
  render: () => <ResetPasswordModalWrapper />,
  parameters: {
    docs: {
      description: {
        story:
          'Default reset password modal with password fields and validation rules. Shows real-time validation for uppercase letters, minimum length (12 characters), and special characters.',
      },
    },
  },
};

export const LoadingState: Story = {
  render: () => <ResetPasswordModalWrapper loading={true} />,
  parameters: {
    docs: {
      description: {
        story:
          'Reset password modal showing loading state while processing the password reset.',
      },
    },
  },
};
