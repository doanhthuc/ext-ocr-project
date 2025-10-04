import type { Meta, StoryObj } from '@storybook/react-vite';

import { DashboardIllustration } from './DashboardIllustration';

const meta = {
  component: DashboardIllustration,
} satisfies Meta<typeof DashboardIllustration>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
