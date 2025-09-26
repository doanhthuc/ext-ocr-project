import { formatFileSize } from '@ocr-platform/shared';

import { cn } from '~shared/utils/cn.util';

export type FileItemStatus = 'in_progress' | 'complete' | 'error';

export type FileQueueItem = {
  id: string;
  name: string;
  size: number;
  type: string;
  progress?: number;
  status: FileItemStatus;
};

export type FileQueueProps = {
  files: Array<FileQueueItem>;
  onRemove?: (fileId: string) => void;
  className?: string;
};

export function FileQueue({ files, onRemove, className }: FileQueueProps) {
  if (!files.length) return null;

  return (
    <div className={cn('flex flex-col gap-3', className)}>
      {files.map(file => (
        <FileQueueItem
          key={file.id}
          file={file}
          onRemove={() => onRemove?.(file.id)}
        />
      ))}
    </div>
  );
}

type FileQueueItemProps = {
  file: FileQueueItem;
  onRemove?: () => void;
};

function FileQueueItem({ file, onRemove }: FileQueueItemProps) {
  const { name, size, type, progress = 0, status } = file;
  const fileExt = type.split('/')[1]?.toUpperCase() || 'FILE';

  return (
    <div
      className={cn(
        'relative w-full h-[72px] border border-[#E4E7EC] rounded-xl overflow-hidden',
        status === 'error' && 'border-red-500'
      )}
    >
      {/* Progress fill background */}
      {status === 'in_progress' && progress > 0 && (
        <div
          className="absolute top-0 left-0 h-full bg-[#F9FAFB] z-0"
          style={{ width: `${progress}%` }}
        />
      )}

      {/* Content */}
      <div className="relative flex items-center p-4 z-10">
        {/* File icon */}
        <FileTypeIcon fileExt={fileExt} />

        {/* File info */}
        <div className="flex flex-col ml-3 flex-1">
          <span className="text-sm font-medium text-[#344054]">{name}</span>
          <span className="text-sm text-[#475467]">
            {formatFileSize(size)}
            {status === 'in_progress' &&
              progress > 0 &&
              ` – ${progress}% uploaded`}
            {status === 'error' && ' – Upload failed'}
          </span>
        </div>

        {/* Status indicator */}
        {status === 'in_progress' && <LoadingIndicator />}
        {status === 'complete' && <CompleteIndicator />}
        {status === 'error' && <ErrorIndicator onClick={onRemove} />}
      </div>
    </div>
  );
}

type FileTypeIconProps = {
  fileExt: string;
};

function FileTypeIcon({ fileExt }: FileTypeIconProps) {
  const getColorByFileType = (ext: string): string => {
    const typeMap: Record<string, string> = {
      PDF: '#F04438',
      DOC: '#2970FF',
      DOCX: '#2970FF',
      XLS: '#079455',
      XLSX: '#079455',
      PPT: '#FF9800',
      PPTX: '#FF9800',
      JPG: '#7839EE',
      JPEG: '#7839EE',
      PNG: '#7839EE',
      GIF: '#7839EE',
      MP4: '#155EEF',
      MP3: '#155EEF',
    };

    return typeMap[ext] || '#667085';
  };

  const bgColor = getColorByFileType(fileExt);

  return (
    <div className="w-10 h-10 flex-shrink-0">
      <div className="relative w-8 h-10 mx-auto">
        <div
          className="absolute inset-0 rounded-sm"
          style={{ backgroundColor: bgColor }}
        />
        <div
          className="absolute top-0 right-0 w-3 h-3 rounded-bl-sm opacity-30"
          style={{ backgroundColor: '#FFFFFF' }}
        />
        <div className="absolute inset-0 flex items-end justify-center pb-1">
          <span className="text-[9px] font-bold text-white">{fileExt}</span>
        </div>
      </div>
    </div>
  );
}

function LoadingIndicator() {
  return (
    <div className="w-8 h-8 flex-shrink-0">
      <div className="w-7 h-7 rounded-full border-4 border-[#F2F4F7] relative">
        <div className="absolute inset-0 w-full h-full rounded-full border-4 border-[#2970FF] border-t-transparent animate-spin" />
      </div>
    </div>
  );
}

function CompleteIndicator() {
  return (
    <div className="w-8 h-8 flex-shrink-0 bg-[#ECFDF3] rounded-full flex items-center justify-center">
      <svg
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M11.6666 3.5L5.24992 9.91667L2.33325 7"
          stroke="#12B76A"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

type ErrorIndicatorProps = {
  onClick?: () => void;
};

function ErrorIndicator({ onClick }: ErrorIndicatorProps) {
  return (
    <button
      onClick={onClick}
      className="w-8 h-8 flex-shrink-0 bg-[#FEF3F2] rounded-full flex items-center justify-center"
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10.5 3.5L3.5 10.5M3.5 3.5L10.5 10.5"
          stroke="#F04438"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
