import type { Meta, StoryObj } from '@storybook/react-vite';

// Import the template image
import templateImage from '~/assets/images/template-bill-restaurant-21c4bc.png';

import { TemplateCard } from './TemplateCard';

const meta: Meta<typeof TemplateCard> = {
  title: 'Components/Upload/TemplateCard',
  component: TemplateCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A template card component for selecting document templates with preview images and checkbox selection.',
      },
    },
  },
  argTypes: {
    title: {
      control: 'text',
      description: 'Template name/title displayed below the image',
    },
    imageUrl: {
      control: 'text',
      description: 'Image source URL for the template preview',
    },
    selected: {
      control: 'boolean',
      description: 'Whether the template is selected/checked',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the card is disabled',
    },
    onSelectionChange: {
      action: 'selection changed',
      description: 'Callback when the selection state changes',
    },
    onClick: {
      action: 'card clicked',
      description: 'Callback when the card is clicked',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Template Bill Restaurant',
    imageUrl: templateImage,
    selected: false,
    disabled: false,
  },
};

export const Selected: Story = {
  args: {
    title: 'Template Bill Restaurant',
    imageUrl: templateImage,
    selected: true,
    disabled: false,
  },
};

export const Disabled: Story = {
  args: {
    title: 'Template Bill Restaurant',
    imageUrl: templateImage,
    selected: false,
    disabled: true,
  },
};

export const DisabledSelected: Story = {
  args: {
    title: 'Template Bill Restaurant',
    imageUrl: templateImage,
    selected: true,
    disabled: true,
  },
};

export const LongTitle: Story = {
  args: {
    title: 'Very Long Template Name for Testing Text Overflow Behavior',
    imageUrl: templateImage,
    selected: false,
    disabled: false,
  },
};

export const MultipleCards: Story = {
  render: () => (
    <div className="flex gap-4 flex-wrap">
      <TemplateCard
        title="Template Bill Restaurant"
        imageUrl={templateImage}
        selected={false}
      />
      <TemplateCard
        title="Invoice Template"
        imageUrl={templateImage}
        selected={true}
      />
      <TemplateCard
        title="Receipt Template"
        imageUrl={templateImage}
        selected={false}
      />
      <TemplateCard
        title="Disabled Template"
        imageUrl={templateImage}
        selected={false}
        disabled={true}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Multiple template cards shown together to demonstrate selection states.',
      },
    },
  },
};
