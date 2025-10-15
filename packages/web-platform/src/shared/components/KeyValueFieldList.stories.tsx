import type { Meta, StoryObj } from '@storybook/react';

import { KeyValueFieldList } from './KeyValueFieldList';

const meta = {
  title: 'Components/KeyValueFieldList',
  component: KeyValueFieldList,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    fields: {
      description: 'Array of field data to display',
    },
    selectedTemplate: {
      control: 'text',
      description: 'Current selected template',
    },
    templates: {
      description: 'Available templates for the dropdown',
    },
    onAddField: {
      action: 'add field',
      description:
        'Callback when add new field is confirmed - receives the new label name',
    },
    onTemplateChange: {
      action: 'template changed',
      description: 'Callback when template is changed',
    },
    onEditField: {
      action: 'edit field',
      description:
        'Callback when a field label is edited - receives field id and new label name',
    },
    onDeleteField: {
      action: 'delete field',
      description: 'Callback when a field is deleted',
    },
    onFieldChange: {
      action: 'field changed',
      description: 'Callback when a field value changes',
    },
  },
} satisfies Meta<typeof KeyValueFieldList>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleFields = [
  { id: '1', label: 'Bàn:', value: '' },
  { id: '2', label: 'Số HĐ:', value: '' },
  { id: '3', label: 'Ngày tạo:', value: '' },
  { id: '4', label: 'Người lập:', value: '' },
  { id: '5', label: 'Tổng cộng:', value: '' },
];

const sampleFieldsWithValues = [
  { id: '1', label: 'Bàn:', value: 'Table 5' },
  { id: '2', label: 'Số HĐ:', value: 'HD-12345' },
  { id: '3', label: 'Ngày tạo:', value: '14/10/2025' },
  { id: '4', label: 'Người lập:', value: 'John Doe' },
  { id: '5', label: 'Tổng cộng:', value: '1,250,000 VND' },
];

const sampleTemplates = [
  { value: 'template-bill-restaurant', label: 'Template Bill Restaurant' },
  { value: 'template-invoice', label: 'Template Invoice' },
  { value: 'template-receipt', label: 'Template Receipt' },
  { value: 'template-custom', label: 'Custom Template' },
];

export const Default: Story = {
  args: {
    fields: sampleFields,
    selectedTemplate: 'Template Bill Restaurant',
    templates: sampleTemplates,
    onAddField: labelName => console.log('Add field:', labelName),
    onTemplateChange: template => console.log('Template changed:', template),
    onEditField: (id, newLabelName) =>
      console.log('Edit field:', id, newLabelName),
    onDeleteField: id => console.log('Delete field:', id),
    onFieldChange: (id, value) => console.log('Field changed:', id, value),
  },
};

export const WithValues: Story = {
  args: {
    fields: sampleFieldsWithValues,
    selectedTemplate: 'Template Bill Restaurant',
    templates: sampleTemplates,
    onAddField: labelName => console.log('Add field:', labelName),
    onTemplateChange: template => console.log('Template changed:', template),
    onEditField: (id, newLabelName) =>
      console.log('Edit field:', id, newLabelName),
    onDeleteField: id => console.log('Delete field:', id),
    onFieldChange: (id, value) => console.log('Field changed:', id, value),
  },
};

export const Empty: Story = {
  args: {
    fields: [],
    selectedTemplate: 'Template Bill Restaurant',
    templates: sampleTemplates,
    onAddField: () => console.log('Add field clicked'),
    onTemplateChange: template => console.log('Template changed:', template),
  },
};

export const SingleField: Story = {
  args: {
    fields: [{ id: '1', label: 'Customer Name:', value: 'Jane Smith' }],
    selectedTemplate: 'Template Invoice',
    templates: sampleTemplates,
    onAddField: labelName => console.log('Add field:', labelName),
    onTemplateChange: template => console.log('Template changed:', template),
    onEditField: (id, newLabelName) =>
      console.log('Edit field:', id, newLabelName),
    onDeleteField: id => console.log('Delete field:', id),
    onFieldChange: (id, value) => console.log('Field changed:', id, value),
  },
};

export const ManyFields: Story = {
  args: {
    fields: [
      ...sampleFieldsWithValues,
      { id: '6', label: 'Tax Amount:', value: '125,000 VND' },
      { id: '7', label: 'Discount:', value: '50,000 VND' },
      { id: '8', label: 'Payment Method:', value: 'Cash' },
      { id: '9', label: 'Notes:', value: 'VIP Customer' },
      { id: '10', label: 'Server:', value: 'Alice' },
    ],
    selectedTemplate: 'Template Bill Restaurant',
    templates: sampleTemplates,
    onAddField: labelName => console.log('Add field:', labelName),
    onTemplateChange: template => console.log('Template changed:', template),
    onEditField: (id, newLabelName) =>
      console.log('Edit field:', id, newLabelName),
    onDeleteField: id => console.log('Delete field:', id),
    onFieldChange: (id, value) => console.log('Field changed:', id, value),
  },
};

export const NoTemplates: Story = {
  args: {
    fields: sampleFields,
    selectedTemplate: 'Default Template',
    templates: [],
    onAddField: () => console.log('Add field clicked'),
  },
};

export const CustomWidth: Story = {
  args: {
    fields: sampleFieldsWithValues,
    selectedTemplate: 'Template Bill Restaurant',
    templates: sampleTemplates,
    className: 'max-w-2xl',
    onAddField: labelName => console.log('Add field:', labelName),
    onTemplateChange: template => console.log('Template changed:', template),
    onEditField: (id, newLabelName) =>
      console.log('Edit field:', id, newLabelName),
    onDeleteField: id => console.log('Delete field:', id),
    onFieldChange: (id, value) => console.log('Field changed:', id, value),
  },
};
