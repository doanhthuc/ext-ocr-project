import type { Meta, StoryObj } from '@storybook/react';

import { useState } from 'react';

import { FileType } from '~shared/components';

import { UploadedFileList } from './UploadedFileList';

const meta = {
  title: 'OCR/UploadedFileList',
  component: UploadedFileList,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    files: {
      control: 'object',
      description: 'Array of files to display',
    },
    selectedFiles: {
      control: 'object',
      description: 'Array of selected file IDs',
    },
    actionText: {
      control: 'text',
      description: 'Action button text',
    },
    onFileCheckChange: {
      action: 'file check changed',
      description: 'Handler for file checkbox changes',
    },
    onFileActionClick: {
      action: 'file action clicked',
      description: 'Handler for file action button click',
    },
  },
} satisfies Meta<typeof UploadedFileList>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleFiles = [
  {
    id: '1',
    fileName: 'bill-01.jpg',
    fileSize: '12 MB',
    fileType: 'jpg' as const,
    status: 'completed' as const,
    statusText: 'OCR Completed',
  },
  {
    id: '2',
    fileName: 'invoice.pdf',
    fileSize: '2.5 MB',
    fileType: 'pdf' as const,
    status: 'uploading' as const,
    statusText: 'OCR Inprogress',
    progress: 65,
  },
  {
    id: '3',
    fileName: 'receipt.png',
    fileSize: '8 MB',
    fileType: 'png' as const,
    status: 'uploaded' as const,
  },
  {
    id: '4',
    fileName: 'contract.docx',
    fileSize: '1.2 MB',
    fileType: 'docx' as const,
    status: 'uploading' as const,
    statusText: 'OCR Inprogress',
    progress: 25,
  },
];

export const Default: Story = {
  args: {
    files: sampleFiles,
    selectedFiles: [],
    actionText: 'Details',
  },
  decorators: [
    Story => (
      <div className="w-[480px]">
        <Story />
      </div>
    ),
  ],
};

export const WithSelectedFiles: Story = {
  args: {
    files: sampleFiles,
    selectedFiles: ['1', '3'],
    actionText: 'Details',
  },
  decorators: [
    Story => (
      <div className="w-[480px]">
        <Story />
      </div>
    ),
  ],
};

export const Interactive: Story = {
  render: function Render(args) {
    const [selectedFiles, setSelectedFiles] = useState<Array<string>>([]);
    const [files, setFiles] = useState(sampleFiles);

    const handleFileCheckChange = (fileId: string) => (checked: boolean) => {
      setSelectedFiles(prev =>
        checked ? [...prev, fileId] : prev.filter(id => id !== fileId)
      );
    };

    const handleFileActionClick = (fileId: string) => {
      setFiles(prev => prev.filter(file => file.id !== fileId));
      setSelectedFiles(prev => prev.filter(id => id !== fileId));
    };

    return (
      <div className="w-[480px]">
        <UploadedFileList
          {...args}
          files={files}
          selectedFiles={selectedFiles}
          onFileCheckChange={handleFileCheckChange}
          onFileActionClick={handleFileActionClick}
        />
      </div>
    );
  },
  args: {
    actionText: 'Remove',
    files: sampleFiles,
    selectedFiles: [],
  },
};

export const Scrollable: Story = {
  args: {
    files: sampleFiles,
    selectedFiles: [],
    actionText: 'Details',
  },
  render: function Render() {
    const [selectedFiles, setSelectedFiles] = useState<Array<string>>([]);

    const manyFiles = Array.from({ length: 10 }, (_, i) => ({
      id: `file-${i + 1}`,
      fileName: `document-${i + 1}.${i % 2 === 0 ? 'pdf' : 'jpg'}`,
      fileSize: `${Math.floor(Math.random() * 20 + 1)} MB`,
      fileType: (i % 2 === 0 ? 'pdf' : 'jpg') as FileType,
      status: (['uploading', 'uploaded', 'completed'] as const)[i % 3],
      statusText:
        i % 3 === 0
          ? 'OCR Inprogress'
          : i % 3 === 2
            ? 'OCR Completed'
            : undefined,
      progress: i % 3 === 0 ? Math.floor(Math.random() * 100) : undefined,
    }));

    const handleFileCheckChange = (fileId: string) => (checked: boolean) => {
      setSelectedFiles(prev =>
        checked ? [...prev, fileId] : prev.filter(id => id !== fileId)
      );
    };

    return (
      <div className="w-[480px] h-[400px] border border-border-light rounded-lg p-4">
        <h3 className="text-base font-semibold mb-4">
          Uploaded Files (Scrollable)
        </h3>
        <div className="h-[calc(100%-2rem)] overflow-y-auto">
          <UploadedFileList
            files={manyFiles}
            selectedFiles={selectedFiles}
            onFileCheckChange={handleFileCheckChange}
            actionText="Details"
          />
        </div>
      </div>
    );
  },
};

export const EmptyList: Story = {
  args: {
    files: [],
    selectedFiles: [],
    actionText: 'Details',
  },
  decorators: [
    Story => (
      <div className="w-[480px]">
        <Story />
      </div>
    ),
  ],
};
