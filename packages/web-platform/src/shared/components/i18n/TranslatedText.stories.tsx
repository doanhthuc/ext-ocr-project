import type { Meta, StoryObj } from '@storybook/react';

import { TranslatedText } from './TranslatedText';

const meta = {
  title: 'Components/i18n/TranslatedText',
  component: TranslatedText,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    i18nKey: {
      control: { type: 'select' },
      options: [
        'common.ok',
        'common.cancel',
        'auth.signIn',
        'navigation.dashboard',
        'validation.required',
      ],
    },
  },
} satisfies Meta<typeof TranslatedText>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    i18nKey: 'common.ok',
  },
};

export const WithParams: Story = {
  args: {
    i18nKey: 'validation.minLength',
    params: { min: 8 },
  },
};

export const WithFallback: Story = {
  args: {
    i18nKey: 'nonexistent.key' as any,
    fallback: 'Fallback text',
  },
};

export const WithStyling: Story = {
  args: {
    i18nKey: 'common.success',
    style: { color: 'green', fontWeight: 'bold' },
  },
};