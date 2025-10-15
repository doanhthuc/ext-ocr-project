import type { Meta, StoryObj } from '@storybook/react';

import { LabeledInputField } from './LabeledInputField';

const meta = {
  title: 'Components/LabeledInputField',
  component: LabeledInputField,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'The label text to display above the input',
    },
    value: {
      control: 'text',
      description: 'The input value',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text when value is empty',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the input is disabled',
    },
    readonly: {
      control: 'boolean',
      description: 'Whether the field is in readonly mode',
    },
    onEdit: {
      action: 'edit clicked',
      description: 'Callback when edit button is clicked',
    },
    onDelete: {
      action: 'delete clicked',
      description: 'Callback when delete button is clicked',
    },
  },
} satisfies Meta<typeof LabeledInputField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Bàn:',
    value: '',
    placeholder: '-',
    onEdit: () => console.log('Edit clicked'),
    onDelete: () => console.log('Delete clicked'),
  },
};

export const WithValue: Story = {
  args: {
    label: 'Số HĐ:',
    value: 'HD-12345',
    onEdit: () => console.log('Edit clicked'),
    onDelete: () => console.log('Delete clicked'),
  },
};

export const ReadOnly: Story = {
  args: {
    label: 'Ngày tạo:',
    value: '14/10/2025',
    readonly: true,
    onEdit: () => console.log('Edit clicked'),
    onDelete: () => console.log('Delete clicked'),
  },
};

export const Disabled: Story = {
  args: {
    label: 'Người lập:',
    value: 'John Doe',
    disabled: true,
    onEdit: () => console.log('Edit clicked'),
    onDelete: () => console.log('Delete clicked'),
  },
};

export const WithoutActions: Story = {
  args: {
    label: 'Tổng cộng:',
    value: '1,250,000 VND',
  },
};

export const EmptyWithPlaceholder: Story = {
  args: {
    label: 'Empty Field:',
    placeholder: 'Enter value...',
    onEdit: () => console.log('Edit clicked'),
    onDelete: () => console.log('Delete clicked'),
  },
};

export const LongLabel: Story = {
  args: {
    label: 'This is a very long label that might wrap to multiple lines:',
    value: 'Some value',
    onEdit: () => console.log('Edit clicked'),
    onDelete: () => console.log('Delete clicked'),
  },
};

export const LongValue: Story = {
  args: {
    label: 'Description:',
    value:
      'This is a very long value that should be truncated or wrapped properly within the input field',
    onEdit: () => console.log('Edit clicked'),
    onDelete: () => console.log('Delete clicked'),
  },
};
