import type { Meta, StoryObj } from '@storybook/react-vite';

import { AuthBanner } from './AuthBanner';

const meta = {
  component: AuthBanner,
} satisfies Meta<typeof AuthBanner>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
