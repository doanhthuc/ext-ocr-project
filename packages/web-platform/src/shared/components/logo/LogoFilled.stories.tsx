import type { Meta, StoryObj } from '@storybook/react';

import { LogoFilled } from './LogoFilled';

const meta = {
  component: LogoFilled,
  args: {
    width: 40,
    height: 40,
  },
} satisfies Meta<typeof LogoFilled>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
