import { Checkbox, Progress } from 'antd';
import React from 'react';

import {
  IconFileTypeDoc,
  IconFileTypeDocx,
  IconFileTypeJpg,
  IconFileTypePdf,
  IconFileTypePng,
} from '~/assets/icons';
import { cn } from '~shared/utils/cn.util';

export type FileType = 'jpg' | 'jpeg' | 'png' | 'pdf' | 'doc' | 'docx';

export type FileUploadStatus = 'uploading' | 'uploaded' | 'completed' | 'idle';

export type FileItemProps = {
  /**
   * File name
   */
  fileName: string;
  /**
   * File size (e.g., "16 MB", "2.5 KB")
   */
  fileSize: string;
  /**
   * File type/extension
   */
  fileType: FileType;
  /**
   * Upload/processing status
   */
  status?: FileUploadStatus;
  /**
   * Status text (e.g., "Uploading...", "Completed")
   */
  statusText?: string;
  /**
   * Upload progress percentage (0-100)
   */
  progress?: number;
  /**
   * Checkbox checked state
   */
  checked?: boolean;
  /**
   * Checkbox change handler
   */
  onCheckChange?: (checked: boolean) => void;
  /**
   * Action button text (e.g., "See details")
   */
  actionText?: string;
  /**
   * Action button click handler
   */
  onActionClick?: () => void;
  /**
   * Custom className for styling
   */
  className?: string;
};

const FILE_TYPE_ICONS: Record<
  FileType,
  React.ComponentType<{ className?: string }>
> = {
  jpg: IconFileTypeJpg,
  jpeg: IconFileTypeJpg,
  png: IconFileTypePng,
  pdf: IconFileTypePdf,
  doc: IconFileTypeDoc,
  docx: IconFileTypeDocx,
};

export function FileItem({
  fileName,
  fileSize,
  fileType,
  status = 'idle',
  statusText,
  progress,
  checked = false,
  onCheckChange,
  actionText,
  onActionClick,
  className,
}: FileItemProps) {
  const FileTypeIcon = FILE_TYPE_ICONS[fileType] || IconFileTypeJpg;

  const getStatusColor = () => {
    switch (status) {
      case 'uploading':
        return 'text-blue-4';
      case 'completed':
        return 'text-green-3';
      default:
        return 'text-gray-11';
    }
  };

  const showProgress = status === 'uploading' && progress !== undefined;

  return (
    <div
      className={cn(
        'bg-white border border-solid border-border-light rounded-xl',
        'flex items-start gap-2 p-3',
        className
      )}
    >
      {/* Checkbox */}
      <div className="flex-shrink-0 pt-0.5">
        <Checkbox
          checked={checked}
          onChange={e => onCheckChange?.(e.target.checked)}
        />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-3 flex-1 min-w-0">
        {/* Top Row */}
        <div className="flex items-start gap-3">
          {/* File Type Icon */}
          <div className="flex-shrink-0 w-10 h-10">
            <FileTypeIcon className="w-full h-full" />
          </div>

          {/* File Info */}
          <div className="flex flex-col gap-1 flex-1 min-w-0">
            {/* File Name */}
            <p className="text-sm font-semibold leading-5 text-gray-13 truncate">
              {fileName}
            </p>

            {/* File Size and Status */}
            <div className="flex gap-2 items-start text-sm font-normal leading-5">
              <span className="text-gray-11 truncate">{fileSize}</span>
              {statusText && (
                <span className={cn('truncate', getStatusColor())}>
                  {statusText}
                </span>
              )}
            </div>
          </div>

          {/* Action Button */}
          {actionText && onActionClick && (
            <button
              type="button"
              onClick={onActionClick}
              className="text-sm font-semibold leading-5 text-blue-4 text-right whitespace-nowrap flex-shrink-0 hover:underline"
            >
              {actionText}
            </button>
          )}
        </div>

        {/* Progress Bar */}
        {showProgress && (
          <div className="flex items-center gap-3 w-full">
            <Progress
              percent={progress}
              showInfo={false}
              strokeColor="#2970ff"
              trailColor="#e4e7ec"
              className="flex-1"
              size="small"
            />
            <span className="text-sm font-medium leading-5 text-text-secondary whitespace-nowrap">
              {progress}%
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
