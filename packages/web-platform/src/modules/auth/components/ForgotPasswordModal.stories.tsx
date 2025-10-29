import type { Meta, StoryObj } from '@storybook/react';

import { useState } from 'react';

import { ForgotPasswordModal } from './ForgotPasswordModal';

const meta: Meta<typeof ForgotPasswordModal> = {
  title: 'Auth/ForgotPasswordModal',
  component: ForgotPasswordModal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ForgotPasswordModal>;

function ForgotPasswordModalWrapper({
  loading = false,
}: {
  loading?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(true);

  const handleConfirm = (email: string) => {
    console.log('Email submitted:', email);
    setIsOpen(false);
    // Reopen after a short delay for demo purposes
    setTimeout(() => {
      setIsOpen(true);
    }, 1000);
  };

  return (
    <ForgotPasswordModal
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      onConfirm={handleConfirm}
      loading={loading}
    />
  );
}

export const Default: Story = {
  render: () => <ForgotPasswordModalWrapper />,
  parameters: {
    docs: {
      description: {
        story:
          'Default forgot password modal with email input field. Users can enter their email address to receive password reset instructions.',
      },
    },
  },
};

export const LoadingState: Story = {
  render: () => <ForgotPasswordModalWrapper loading={true} />,
  parameters: {
    docs: {
      description: {
        story:
          'Forgot password modal showing loading state while processing the email submission.',
      },
    },
  },
};
