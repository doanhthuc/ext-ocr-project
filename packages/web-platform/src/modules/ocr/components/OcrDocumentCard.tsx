import { Button } from 'antd';

import { IconCircleMore, IconFileSearch02 } from '~/assets/icons';
import { ProgressBar } from '~/shared/components/progress/ProgressBar';
import { cn } from '~/shared/utils/cn.util';

export type OcrDocumentCardProps = {
  thumbnail?: string;
  fileName: string;
  lastModified: string;
  convertTo: 'Docx' | 'Excel';
  isLoading?: boolean;
  progress?: number;
  sheetCount?: number;
  onMoreClick?: () => void;
  className?: string;
};

export function OcrDocumentCard({
  thumbnail,
  fileName,
  lastModified,
  convertTo,
  isLoading = false,
  progress = 0,
  sheetCount,
  onMoreClick,
  className,
}: OcrDocumentCardProps) {
  const isExcel = convertTo === 'Excel';
  const colorClass = isExcel ? 'text-success-lighter' : 'text-primary-light';

  return (
    <div
      className={cn(
        'flex items-center gap-[18px] p-3 bg-white rounded-xl shadow-sm',
        className
      )}
    >
      <div className="h-[61px] w-[61px] bg-bg-secondary rounded-[6px] overflow-hidden">
        {thumbnail && (
          <img
            src={thumbnail}
            alt={fileName}
            className="w-full h-full object-cover"
          />
        )}
      </div>

      <div className="flex flex-col gap-1 flex-1">
        <span className="text-sm font-medium text-text-secondary">
          {fileName}
        </span>
        <div className="flex flex-col gap-1">
          <div className="flex flex-col gap-1">
            <span className="text-xs text-text-lighter">
              Last modified: {lastModified}
            </span>
            <span className={cn('text-xs', colorClass)}>
              Convert to {convertTo}
            </span>
          </div>

          {isLoading ? (
            <ProgressBar
              value={progress}
              max={100}
              label={`${progress}%`}
              className="progress-bar-custom"
            />
          ) : (
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-1">
                <IconFileSearch02 className="text-icon-muted" />
                <span className="text-sm font-normal text-text-lighter">
                  {sheetCount} Sheet
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {!isLoading && onMoreClick && (
        <Button
          type="text"
          className="flex items-center justify-center w-7 h-7 p-0"
          onClick={onMoreClick}
        >
          <IconCircleMore className="text-text-secondary" />
        </Button>
      )}
    </div>
  );
}
