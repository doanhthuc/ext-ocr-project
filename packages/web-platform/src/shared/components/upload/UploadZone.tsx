import { UploadProps } from 'antd';
import React, { useState } from 'react';

import { IconUpload } from '~/assets/icons';
import { FileExt } from '~shared/types/file.type';
import { cn } from '~shared/utils/cn.util';

import { Upload } from './Upload';

export type UploadZoneProps = {
  /**
   * Custom text for the upload button. Defaults to "Click to upload"
   */
  uploadText?: string;
  /**
   * Custom text for the drag and drop area. Defaults to "or drag and drop"
   */
  dragText?: string;
  /**
   * Custom text for file format info. Defaults to "PNG, JPG or GIF (max. 800×400px)"
   */
  formatText?: string;
  /**
   * Maximum file size in KB for display text. Defaults to null (no size limit shown)
   */
  maxSizeText?: string;
  /**
   * Allowed file extensions
   */
  allowExts?: Array<FileExt> | '*';
  /**
   * Custom className for styling
   */
  className?: string;
  /**
   * Whether to show the upload list
   */
  showUploadList?: boolean;
  /**
   * Multiple file upload
   */
  multiple?: boolean;
  /**
   * File upload callback
   */
  onChange?: UploadProps['onChange'];
  /**
   * Custom request handler
   */
  customRequest?: UploadProps['customRequest'];
  /**
   * Max file count
   */
  maxCount?: number;
  /**
   * Accept file types (MIME types)
   */
  accept?: string;
  /**
   * Whether the upload zone is disabled
   */
  disabled?: boolean;
};

export function UploadZone({
  uploadText = 'Click to upload',
  dragText = 'or drag and drop',
  formatText = 'PNG, JPG or JPEG (max. 800×400px)',
  maxSizeText,
  allowExts = ['png', 'jpg', 'jpeg'],
  className,
  showUploadList = false,
  multiple = false,
  onChange,
  customRequest,
  maxCount,
  accept,
  disabled = false,
  ...props
}: UploadZoneProps) {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  };

  return (
    <div className={cn('w-full', className)}>
      <Upload
        allowExts={allowExts}
        showUploadList={showUploadList}
        multiple={multiple}
        onChange={onChange}
        customRequest={customRequest}
        maxCount={maxCount}
        accept={accept}
        disabled={disabled}
        {...props}
      >
        <div
          className={cn(
            'flex flex-col items-center justify-center w-full min-h-48 p-8',
            'border-2 border-dashed rounded-lg cursor-pointer transition-all duration-200',
            'hover:border-primary hover:bg-bg-active',
            isDragOver && 'border-primary bg-bg-active',
            disabled && 'cursor-not-allowed opacity-50',
            !isDragOver && !disabled && 'border-border-light bg-bg-primary'
          )}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          {/* Upload Icon */}
          <div className="w-12 h-12 mb-4 p-3 rounded-full border border-border-light bg-bg-secondary flex items-center justify-center">
            <IconUpload className="w-6 h-6 text-text-muted" />
          </div>

          {/* Upload Text */}
          <div className="text-center space-y-1 mb-4">
            <div className="text-sm text-text-tertiary">
              <span className="font-semibold text-primary">{uploadText}</span>{' '}
              <span>{dragText}</span>
            </div>
          </div>

          {/* Format Info */}
          <div className="text-xs text-text-light text-center">
            {formatText}
            {maxSizeText && (
              <>
                <br />
                {maxSizeText}
              </>
            )}
          </div>
        </div>
      </Upload>
    </div>
  );
}
