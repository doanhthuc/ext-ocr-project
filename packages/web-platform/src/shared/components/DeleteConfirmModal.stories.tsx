import type { Meta, StoryObj } from '@storybook/react';

import { useState } from 'react';

import { DeleteConfirmModal } from './DeleteConfirmModal';

const meta: Meta<typeof DeleteConfirmModal> = {
  title: 'Components/DeleteConfirmModal',
  component: DeleteConfirmModal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof DeleteConfirmModal>;

// Wrapper component to handle state for stories
function DeleteConfirmModalWrapper({ itemName }: { itemName?: string }) {
  const [isOpen, setIsOpen] = useState(true);

  const handleConfirm = () => {
    console.log('Delete confirmed');
    setIsOpen(false);
    // Reopen after a short delay for demo purposes
    setTimeout(() => {
      setIsOpen(true);
    }, 1000);
  };

  return (
    <DeleteConfirmModal
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      onConfirm={handleConfirm}
      itemName={itemName}
    />
  );
}

export const Default: Story = {
  render: () => <DeleteConfirmModalWrapper />,
  parameters: {
    docs: {
      description: {
        story:
          'Default delete confirmation modal without a specific item name.',
      },
    },
  },
};

export const WithItemName: Story = {
  render: () => <DeleteConfirmModalWrapper itemName="Customer Name" />,
  parameters: {
    docs: {
      description: {
        story:
          'Delete confirmation modal with a specific item name shown in the message.',
      },
    },
  },
};

export const WithLongItemName: Story = {
  render: () => (
    <DeleteConfirmModalWrapper itemName="Very Long Field Name That Should Wrap Properly" />
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Delete confirmation modal with a long item name to test text wrapping.',
      },
    },
  },
};

// Wrapper component for loading state
function LoadingDeleteModalWrapper() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <DeleteConfirmModal
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      onConfirm={() => {
        // Empty function for loading state demo
      }}
      itemName="Test Field"
      loading={true}
    />
  );
}

export const LoadingState: Story = {
  render: () => <LoadingDeleteModalWrapper />,
  parameters: {
    docs: {
      description: {
        story:
          'Delete confirmation modal showing loading state while processing the deletion.',
      },
    },
  },
};
