import type { Meta, StoryObj } from '@storybook/react-vite';

import { fn } from 'storybook/test';

import { TranslationCard } from './TranslationCard';

const meta: Meta<typeof TranslationCard> = {
  title: 'Components/TranslationCard',
  component: TranslationCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    language: { control: 'text' },
    text: { control: 'text' },
    loading: { control: 'boolean' },
    onCopy: { action: 'copy clicked' },
    onShare: { action: 'share clicked' },
    onSpeak: { action: 'speak clicked' },
  },
  args: {
    onCopy: fn(),
    onShare: fn(),
    onSpeak: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    language: 'English',
    text: 'Wheel of fortune contestant christopher coleman has had enough of his name being dragged through the mud coleman appeared on tuesday nights wheel',
  },
};

export const LongText: Story = {
  args: {
    language: 'English',
    text: 'This is a much longer translated text that demonstrates how the component handles extensive content. The text should wrap naturally within the container and maintain proper spacing and readability. This translation shows how longer passages are displayed in the card.',
  },
};

export const ShortText: Story = {
  args: {
    language: 'Spanish',
    text: 'Texto traducido corto.',
  },
};

export const DifferentLanguage: Story = {
  args: {
    language: 'French',
    text: 'Bonjour le monde! Ceci est un exemple de texte traduit en français.',
  },
};

export const Loading: Story = {
  args: {
    language: 'English',
    text: 'This translated text will not be visible when loading',
    loading: true,
  },
};

export const WithCustomClass: Story = {
  args: {
    language: 'German',
    text: 'Dies ist ein Beispieltext auf Deutsch.',
    className: 'shadow-lg',
  },
};
