import type { Meta, StoryObj } from '@storybook/react-vite';

import { FileQueue, FileQueueItem } from './FileQueue';

const meta: Meta<typeof FileQueue> = {
  title: 'Components/Upload/FileQueue',
  component: FileQueue,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof FileQueue>;

const mockFiles: Array<FileQueueItem> = [
  {
    id: '1',
    name: 'Dashboard recording.png',
    size: 16 * 1024 * 1024, // 16MB
    type: 'image/png',
    progress: 70,
    status: 'in_progress',
  },
  {
    id: '2',
    name: 'Annual report.pdf',
    size: 3.2 * 1024 * 1024, // 3.2MB
    type: 'application/pdf',
    status: 'complete',
  },
  {
    id: '3',
    name: 'Presentation.pptx',
    size: 8.5 * 1024 * 1024, // 8.5MB
    type: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    status: 'error',
  },
  {
    id: '4',
    name: 'Project data.xlsx',
    size: 1.8 * 1024 * 1024, // 1.8MB
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    progress: 30,
    status: 'in_progress',
  },
  {
    id: '5',
    name: 'Meeting recording.mp4',
    size: 45 * 1024 * 1024, // 45MB
    type: 'video/mp4',
    status: 'complete',
  },
];

export const Default: Story = {
  args: {
    files: mockFiles,
  },
};

export const InProgress: Story = {
  args: {
    files: mockFiles.filter(file => file.status === 'in_progress'),
  },
};

export const Completed: Story = {
  args: {
    files: mockFiles.filter(file => file.status === 'complete'),
  },
};

export const Error: Story = {
  args: {
    files: mockFiles.filter(file => file.status === 'error'),
  },
};

export const Empty: Story = {
  args: {
    files: [],
  },
};
