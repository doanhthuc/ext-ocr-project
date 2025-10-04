import type { Meta, StoryObj } from '@storybook/react-vite';

import { LanguageSelector } from './LanguageSelector';

const meta = {
  title: 'Components/LanguageSelector',
  component: LanguageSelector,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof LanguageSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithCustomWidth: Story = {
  render: () => (
    <div style={{ width: 200 }}>
      <LanguageSelector />
    </div>
  ),
};