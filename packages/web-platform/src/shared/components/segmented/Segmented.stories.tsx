import type { Meta, StoryObj } from '@storybook/react';

import { Segmented } from './Segmented';

const meta = {
  component: Segmented,
} satisfies Meta<typeof Segmented>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    options: [
      { label: 'Option 1', value: 'option-1' },
      { label: 'Option 2', value: 'option-2' },
      { label: 'Option 3', value: 'option-3' },
    ],
  },
};
