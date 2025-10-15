import type { Meta, StoryObj } from '@storybook/react';

import { useState } from 'react';

import { FileItem } from './FileItem';

const meta = {
  title: 'Components/FileItem',
  component: FileItem,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    fileName: {
      control: 'text',
      description: 'File name',
    },
    fileSize: {
      control: 'text',
      description: 'File size (e.g., "16 MB", "2.5 KB")',
    },
    fileType: {
      control: 'select',
      options: ['jpg', 'jpeg', 'png', 'pdf', 'doc', 'docx'],
      description: 'File type/extension',
    },
    status: {
      control: 'select',
      options: ['idle', 'uploading', 'uploaded', 'completed'],
      description: 'Upload/processing status',
    },
    statusText: {
      control: 'text',
      description: 'Status text',
    },
    progress: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description: 'Upload progress percentage (0-100)',
    },
    checked: {
      control: 'boolean',
      description: 'Checkbox checked state',
    },
    actionText: {
      control: 'text',
      description: 'Action button text',
    },
    onCheckChange: {
      action: 'check changed',
      description: 'Checkbox change handler',
    },
    onActionClick: {
      action: 'action clicked',
      description: 'Action button click handler',
    },
  },
} satisfies Meta<typeof FileItem>;

export default meta;
type Story = StoryObj<typeof meta>;

// Loading state with progress bar
export const Loading: Story = {
  args: {
    fileName: 'bill-02.png',
    fileSize: '16 MB',
    fileType: 'jpg',
    status: 'uploading',
    statusText: 'OCR Inprogress',
    progress: 40,
    checked: false,
    actionText: 'Details',
  },
};

// Uploaded state (no progress bar)
export const Uploaded: Story = {
  args: {
    fileName: 'bill-02.png',
    fileSize: '16 MB',
    fileType: 'jpg',
    status: 'uploaded',
    checked: false,
    actionText: 'Details',
  },
};

// Checked state (checkbox selected)
export const Checked: Story = {
  args: {
    fileName: 'bill-02.png',
    fileSize: '16 MB',
    fileType: 'jpg',
    status: 'uploaded',
    checked: true,
    actionText: 'Details',
  },
};

// Completed state with success status
export const Completed: Story = {
  args: {
    fileName: 'bill-02.png',
    fileSize: '16 MB',
    fileType: 'jpg',
    status: 'completed',
    statusText: 'OCR Completed',
    checked: false,
    actionText: 'Details',
  },
};

export const PngFile: Story = {
  args: {
    fileName: 'screenshot.png',
    fileSize: '5.2 MB',
    fileType: 'png',
    status: 'completed',
    statusText: 'Completed',
    actionText: 'See details',
  },
};

export const PdfFile: Story = {
  args: {
    fileName: 'invoice-2025.pdf',
    fileSize: '1.8 MB',
    fileType: 'pdf',
    status: 'uploading',
    statusText: 'Uploading...',
  },
};

export const DocFile: Story = {
  args: {
    fileName: 'report.doc',
    fileSize: '890 KB',
    fileType: 'doc',
    status: 'completed',
    statusText: 'Completed',
    actionText: 'See details',
  },
};

export const DocxFile: Story = {
  args: {
    fileName: 'contract-final.docx',
    fileSize: '1.2 MB',
    fileType: 'docx',
    status: 'completed',
    statusText: 'Completed',
    actionText: 'See details',
  },
};

export const LongFileName: Story = {
  args: {
    fileName: 'this-is-a-very-long-file-name-that-should-truncate-properly.jpg',
    fileSize: '25 MB',
    fileType: 'jpg',
    status: 'uploading',
    statusText: 'Uploading...',
  },
};

export const CustomWidth: Story = {
  args: {
    fileName: 'bill-02.png',
    fileSize: '16 MB',
    fileType: 'jpg',
    status: 'completed',
    statusText: 'Completed',
    actionText: 'See details',
  },
  decorators: [
    Story => (
      <div className="w-96">
        <Story />
      </div>
    ),
  ],
};

export const Interactive: Story = {
  render: function Render(args) {
    const [checked, setChecked] = useState(false);

    return (
      <div className="w-[480px]">
        <FileItem {...args} checked={checked} onCheckChange={setChecked} />
      </div>
    );
  },
  args: {
    fileName: 'bill-02.png',
    fileSize: '16 MB',
    fileType: 'jpg',
    status: 'uploaded',
    actionText: 'Details',
  },
};

export const MultipleFiles: Story = {
  args: {
    fileName: '',
    fileSize: '',
    fileType: 'jpg',
  },
  render: function Render() {
    const [checkedStates, setCheckedStates] = useState<Record<string, boolean>>(
      {}
    );

    const files = [
      {
        fileName: 'bill-01.jpg',
        fileSize: '12 MB',
        fileType: 'jpg' as const,
        status: 'completed' as const,
        statusText: 'OCR Completed',
      },
      {
        fileName: 'invoice.pdf',
        fileSize: '2.5 MB',
        fileType: 'pdf' as const,
        status: 'uploading' as const,
        statusText: 'OCR Inprogress',
        progress: 65,
      },
      {
        fileName: 'receipt.png',
        fileSize: '8 MB',
        fileType: 'png' as const,
        status: 'uploaded' as const,
      },
      {
        fileName: 'contract.docx',
        fileSize: '1.2 MB',
        fileType: 'docx' as const,
        status: 'uploading' as const,
        statusText: 'OCR Inprogress',
        progress: 25,
      },
    ];

    return (
      <div className="w-[480px] space-y-2">
        {files.map(file => (
          <FileItem
            key={file.fileName}
            {...file}
            checked={checkedStates[file.fileName] || false}
            onCheckChange={checked =>
              setCheckedStates(prev => ({ ...prev, [file.fileName]: checked }))
            }
            actionText="Details"
            onActionClick={() => console.log(`Clicked ${file.fileName}`)}
          />
        ))}
      </div>
    );
  },
};
