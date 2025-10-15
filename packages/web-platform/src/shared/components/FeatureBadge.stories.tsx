import type { Meta, StoryObj } from '@storybook/react';

import { FeatureBadge } from './FeatureBadge';

const meta = {
  title: 'Components/FeatureBadge',
  component: FeatureBadge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof FeatureBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NoUpfrontCost: Story = {
  args: {
    value: 'No upfront cost',
  },
};

export const FastSetup: Story = {
  args: {
    value: 'Fast setup',
  },
};

export const CustomText: Story = {
  args: {
    value: 'Custom feature',
  },
};
