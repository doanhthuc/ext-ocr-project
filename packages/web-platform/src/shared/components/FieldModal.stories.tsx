import type { Meta, StoryObj } from '@storybook/react';

import { useState } from 'react';

import { FieldModal } from './FieldModal';

const meta: Meta<typeof FieldModal> = {
  title: 'Components/FieldModal',
  component: FieldModal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof FieldModal>;

// Wrapper component to handle state for stories
function FieldModalWrapper({
  mode,
  initialValue,
}: {
  mode: 'create' | 'edit';
  initialValue?: string;
}) {
  const [isOpen, setIsOpen] = useState(true);
  const [result, setResult] = useState('');

  const handleConfirm = (labelName: string) => {
    setResult(`Confirmed: ${labelName}`);
    setIsOpen(false);
    // Reopen after a short delay for demo purposes
    setTimeout(() => {
      setIsOpen(true);
      setResult('');
    }, 1000);
  };

  return (
    <div>
      <FieldModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={handleConfirm}
        mode={mode}
        initialValue={initialValue}
      />
      {result && (
        <div className="mt-4 text-center text-sm text-text-muted">{result}</div>
      )}
    </div>
  );
}

export const CreateMode: Story = {
  render: () => <FieldModalWrapper mode="create" />,
  parameters: {
    docs: {
      description: {
        story:
          'Modal for creating a new field. Shows "Create New Field" title and placeholder text in the input.',
      },
    },
  },
};

export const EditMode: Story = {
  render: () => <FieldModalWrapper mode="edit" initialValue="Bàn:" />,
  parameters: {
    docs: {
      description: {
        story:
          'Modal for editing an existing field. Shows "Edit field" title and pre-fills the input with the current value.',
      },
    },
  },
};

export const EditModeWithLongValue: Story = {
  render: () => (
    <FieldModalWrapper
      mode="edit"
      initialValue="Customer Full Name and Address"
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Modal in edit mode with a longer field label value.',
      },
    },
  },
};

// Wrapper component for loading state
function LoadingFieldModalWrapper() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <FieldModal
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      onConfirm={() => {
        // Empty function for loading state demo
      }}
      mode="create"
      loading={true}
    />
  );
}

export const LoadingState: Story = {
  render: () => <LoadingFieldModalWrapper />,
  parameters: {
    docs: {
      description: {
        story: 'Modal showing loading state with disabled buttons.',
      },
    },
  },
};
