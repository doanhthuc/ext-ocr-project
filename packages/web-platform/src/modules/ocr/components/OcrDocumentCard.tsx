import { ProgressBar } from '~/shared/components/progress/ProgressBar';
import { cn } from '~/shared/utils/cn.util';
import { useTranslation } from '~shared/hooks/useTranslation';

export type OcrDocumentCardProps = {
  thumbnail?: string;
  fileName: string;
  lastModified: string;
  isLoading?: boolean;
  progress?: number;
  className?: string;
};

export function OcrDocumentCard({
  thumbnail,
  fileName,
  lastModified,
  isLoading = false,
  progress = 0,
  className,
}: OcrDocumentCardProps) {
  const { t } = useTranslation();

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
              {t('ocr.lastModified')}: {lastModified}
            </span>
          </div>

          {isLoading ? (
            <ProgressBar
              value={progress}
              max={100}
              label={`${progress}%`}
              className="progress-bar-custom"
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}
