import { UploadProps } from 'antd';
import React, { useState } from 'react';

import { IconUploadPicture } from '~/assets/icons';
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
    <div className={cn('w-full [&_.ant-upload]:w-full', className)}>
      <Upload
        allowExts={allowExts}
        showUploadList={showUploadList}
        multiple={multiple}
        onChange={onChange}
        customRequest={customRequest}
        maxCount={maxCount}
        accept={accept}
        disabled={disabled}
        className=""
        {...props}
      >
        <div
          className={cn(
            'flex flex-col items-center justify-center w-full px-6 py-4 gap-1',
            'border border-solid rounded-xl cursor-pointer transition-all duration-200',
            'bg-white',
            'hover:border-primary hover:bg-bg-active',
            isDragOver && 'border-primary bg-bg-active',
            disabled && 'cursor-not-allowed opacity-50',
            !isDragOver && !disabled && 'border-border-light'
          )}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          {/* Content */}
          <div className="flex flex-col items-center gap-3 w-full">
            {/* Upload Icon */}
            <div className="w-10 h-10 rounded-lg border border-solid border-gray-12 bg-white flex items-center justify-center">
              <IconUploadPicture className="w-5 h-5 text-gray-13" />
            </div>

            {/* Text and supporting text */}
            <div className="flex flex-col items-center gap-1 w-full">
              {/* Action */}
              <div className="flex items-start justify-center gap-1 w-full">
                <div className="flex items-center justify-center gap-1.5">
                  <span className="text-sm font-semibold leading-5 text-blue-4 whitespace-nowrap">
                    {uploadText}
                  </span>
                </div>
                <span className="text-sm font-normal leading-5 text-gray-11 whitespace-nowrap">
                  {dragText}
                </span>
              </div>

              {/* Format Info */}
              <div className="text-xs font-normal leading-4 text-gray-11 text-center w-full">
                {formatText}
                {maxSizeText && ` ${maxSizeText}`}
              </div>
            </div>
          </div>
        </div>
      </Upload>
    </div>
  );
}
