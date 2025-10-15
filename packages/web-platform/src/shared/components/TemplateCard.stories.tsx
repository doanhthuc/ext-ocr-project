import type { Meta, StoryObj } from '@storybook/react';

import { useState } from 'react';

import { TemplateCard } from './TemplateCard';

const meta = {
  title: 'Components/TemplateCard',
  component: TemplateCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Template title',
    },
    lastModified: {
      control: 'text',
      description: 'Last modified date text',
    },
    checked: {
      control: 'boolean',
      description: 'Whether the template is selected',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the card is disabled',
    },
    onClick: {
      action: 'clicked',
      description: 'Click handler',
    },
    onChange: {
      action: 'changed',
      description: 'Change handler for controlled component',
    },
  },
} satisfies Meta<typeof TemplateCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Template Bill Restaurant',
    lastModified: 'Last modified: Jun 12.2025',
    checked: false,
  },
};

export const Checked: Story = {
  args: {
    title: 'Template Bill Restaurant',
    lastModified: 'Last modified: Jun 12.2025',
    checked: true,
  },
};

export const Disabled: Story = {
  args: {
    title: 'Template Bill Restaurant',
    lastModified: 'Last modified: Jun 12.2025',
    checked: false,
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    title: 'Template Bill Restaurant',
    lastModified: 'Last modified: Jun 12.2025',
    checked: true,
    disabled: true,
  },
};

export const LongText: Story = {
  args: {
    title: 'Template Bill Restaurant With Very Long Name That Should Truncate',
    lastModified: 'Last modified: December 31, 2025 at 11:59 PM',
    checked: false,
  },
};

export const Interactive: Story = {
  render: function Render(args) {
    const [checked, setChecked] = useState(false);

    return (
      <div className="space-y-4">
        <TemplateCard {...args} checked={checked} onChange={setChecked} />
        <p className="text-sm text-gray-11">
          Current state: {checked ? 'Checked' : 'Unchecked'}
        </p>
      </div>
    );
  },
  args: {
    title: 'Template Bill Restaurant',
    lastModified: 'Last modified: Jun 12.2025',
  },
};

export const MultipleCards: Story = {
  render: function Render() {
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

    const templates = [
      {
        id: 1,
        title: 'Template Bill Restaurant',
        lastModified: 'Last modified: Jun 12.2025',
      },
      {
        id: 2,
        title: 'Template Invoice',
        lastModified: 'Last modified: Jun 10.2025',
      },
      {
        id: 3,
        title: 'Template Receipt',
        lastModified: 'Last modified: Jun 8.2025',
      },
      {
        id: 4,
        title: 'Template Order Form',
        lastModified: 'Last modified: Jun 5.2025',
      },
    ];

    return (
      <div className="w-80 space-y-2">
        {templates.map((template, index) => (
          <TemplateCard
            key={template.id}
            title={template.title}
            lastModified={template.lastModified}
            checked={selectedIndex === index}
            onChange={() =>
              setSelectedIndex(selectedIndex === index ? null : index)
            }
          />
        ))}
      </div>
    );
  },
  args: {
    title: 'Template Bill Restaurant',
    lastModified: 'Last modified: Jun 12.2025',
  },
};
