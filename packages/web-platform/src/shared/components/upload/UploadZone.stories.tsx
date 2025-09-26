import type { Meta, StoryObj } from '@storybook/react';

import { UploadFile } from 'antd';
import { UploadChangeParam } from 'antd/es/upload';

import { UploadZone } from './UploadZone';

const meta: Meta<typeof UploadZone> = {
  title: 'Components/Upload/UploadZone',
  component: UploadZone,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    uploadText: {
      control: 'text',
      description: 'Text for the upload button',
    },
    dragText: {
      control: 'text',
      description: 'Text for drag and drop area',
    },
    formatText: {
      control: 'text',
      description: 'Text showing allowed file formats',
    },
    maxSizeText: {
      control: 'text',
      description: 'Text showing maximum file size',
    },
    allowExts: {
      control: 'object',
      description: 'Allowed file extensions',
    },
    multiple: {
      control: 'boolean',
      description: 'Allow multiple file uploads',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the upload zone',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const CustomText: Story = {
  args: {
    uploadText: 'Choose files',
    dragText: 'or drop them here',
    formatText: 'PDF, DOCX or TXT files (max. 5MB)',
  },
};

export const MultipleFiles: Story = {
  args: {
    multiple: true,
    uploadText: 'Select multiple files',
    formatText: 'Multiple PNG, JPG files allowed',
  },
};

export const DocumentUpload: Story = {
  args: {
    allowExts: ['pdf', 'docx', 'txt'],
    uploadText: 'Upload document',
    formatText: 'PDF, DOCX or TXT (max. 10MB)',
    maxSizeText: 'Maximum file size: 10MB',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    uploadText: 'Upload not available',
  },
};

export const WithCallback: Story = {
  args: {
    onChange: (info: UploadChangeParam<UploadFile>) => {
      console.log('Files uploaded:', info.fileList);
    },
  },
};
