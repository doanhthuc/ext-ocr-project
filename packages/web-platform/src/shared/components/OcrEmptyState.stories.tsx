import type { Meta, StoryObj } from '@storybook/react';

import { OcrEmptyState } from './OcrEmptyState';

const meta = {
  title: 'Components/OcrEmptyState',
  component: OcrEmptyState,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    steps: {
      control: 'object',
      description: 'Array of steps to display',
    },
    className: {
      control: 'text',
      description: 'Custom className for styling',
    },
  },
} satisfies Meta<typeof OcrEmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const CustomSteps: Story = {
  args: {
    steps: [
      {
        number: 1,
        text: 'First step: Do something',
      },
      {
        number: 2,
        text: 'Second step: Do something else',
      },
    ],
  },
};

export const SingleStep: Story = {
  args: {
    steps: [
      {
        number: 1,
        text: 'Only one step to complete',
      },
    ],
  },
};

export const ManySteps: Story = {
  args: {
    steps: [
      {
        number: 1,
        text: 'Upload an image/select the file for OCR processing',
      },
      {
        number: 2,
        text: 'Choose templates or edit them yourself',
      },
      {
        number: 3,
        text: 'Click OCR Now and receive the results',
      },
      {
        number: 4,
        text: 'Review and export the processed data',
      },
      {
        number: 5,
        text: 'Save your work for future reference',
      },
    ],
  },
};

export const CustomWidth: Story = {
  args: {},
  decorators: [
    Story => (
      <div className="w-[600px]">
        <Story />
      </div>
    ),
  ],
};
