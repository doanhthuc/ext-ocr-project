import type { Meta, StoryObj } from '@storybook/react-vite';

import { LogoSquare } from './LogoSquare';

const meta = {
  component: LogoSquare,
  tags: ['autodocs'],
} satisfies Meta<typeof LogoSquare>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Black: Story = {
  args: {
    variant: 'black',
  },
};

export const White: Story = {
  args: {
    variant: 'white',
  },
};
