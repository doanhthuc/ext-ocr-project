import type { Meta, StoryObj } from '@storybook/react';

import { useState } from 'react';

import { SaveAsTemplateModal } from './SaveAsTemplateModal';

const meta: Meta<typeof SaveAsTemplateModal> = {
  title: 'Components/SaveAsTemplateModal',
  component: SaveAsTemplateModal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof SaveAsTemplateModal>;

// Wrapper component to handle state for stories
function SaveAsTemplateModalWrapper({
  initialValue,
}: {
  initialValue?: string;
}) {
  const [isOpen, setIsOpen] = useState(true);
  const [result, setResult] = useState('');

  const handleConfirm = (templateName: string) => {
    setResult(`Confirmed: ${templateName}`);
    setIsOpen(false);
    // Reopen after a short delay for demo purposes
    setTimeout(() => {
      setIsOpen(true);
      setResult('');
    }, 1000);
  };

  return (
    <div>
      <SaveAsTemplateModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={handleConfirm}
        initialValue={initialValue}
      />
      {result && (
        <div className="mt-4 text-center text-sm text-text-muted">{result}</div>
      )}
    </div>
  );
}

export const Default: Story = {
  render: () => <SaveAsTemplateModalWrapper />,
  parameters: {
    docs: {
      description: {
        story:
          'Default save as template modal with placeholder text in the input.',
      },
    },
  },
};

export const WithInitialValue: Story = {
  render: () => <SaveAsTemplateModalWrapper initialValue="My Template" />,
  parameters: {
    docs: {
      description: {
        story:
          'Save as template modal with an initial value pre-filled in the input.',
      },
    },
  },
};

export const WithLongInitialValue: Story = {
  render: () => (
    <SaveAsTemplateModalWrapper initialValue="Very Long Template Name That Should Display Properly" />
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Save as template modal with a longer template name to test text handling.',
      },
    },
  },
};

// Wrapper component for loading state
function LoadingSaveAsTemplateModalWrapper() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <SaveAsTemplateModal
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      onConfirm={() => {
        // Empty function for loading state demo
      }}
      loading={true}
    />
  );
}

export const LoadingState: Story = {
  render: () => <LoadingSaveAsTemplateModalWrapper />,
  parameters: {
    docs: {
      description: {
        story: 'Modal showing loading state with disabled buttons.',
      },
    },
  },
};
