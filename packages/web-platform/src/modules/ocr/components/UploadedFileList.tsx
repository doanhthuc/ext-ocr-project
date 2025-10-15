import type { FileType } from '~shared/components/FileItem';

import { FileItem } from '~shared/components';

type UploadedFile = {
  fileName: string;
  fileSize: string;
  fileType: FileType;
  id: string;
  progress?: number;
  status?: 'uploading' | 'uploaded' | 'completed' | 'idle';
  statusText?: string;
};

type UploadedFileListProps = {
  /**
   * Array of files to display
   */
  files: Array<UploadedFile>;
  /**
   * Array of selected file IDs
   */
  selectedFiles?: Array<string>;
  /**
   * Handler for file checkbox changes
   */
  onFileCheckChange?: (fileId: string) => (checked: boolean) => void;
  /**
   * Handler for file action button click
   */
  onFileActionClick?: (fileId: string) => void;
  /**
   * Action button text
   */
  actionText?: string;
  /**
   * Custom className for the container
   */
  className?: string;
};

export function UploadedFileList({
  files,
  selectedFiles = [],
  onFileCheckChange,
  onFileActionClick,
  actionText = 'Details',
  className,
}: UploadedFileListProps) {
  if (files.length === 0) {
    return null;
  }

  return (
    <div className={className}>
      <div className="flex flex-col gap-2">
        {files.map(file => (
          <FileItem
            key={file.id}
            fileName={file.fileName}
            fileSize={file.fileSize}
            fileType={file.fileType}
            status={file.status}
            statusText={file.statusText}
            progress={file.progress}
            checked={selectedFiles.includes(file.id)}
            onCheckChange={onFileCheckChange?.(file.id)}
            actionText={actionText}
            onActionClick={() => onFileActionClick?.(file.id)}
          />
        ))}
      </div>
    </div>
  );
}
