import { Progress } from 'antd';

import { cn } from '~/shared/utils/cn.util';
import { useTranslation } from '~shared/hooks/useTranslation';

export type OcrProgressCardProps = {
  thumbnail?: string;
  fileName: string;
  lastModified: string;
  convertTo: 'Docx' | 'Excel';
  progress: number;
  className?: string;
};

export function OcrProgressCard({
  thumbnail,
  fileName,
  lastModified,
  convertTo,
  progress,
  className,
}: OcrProgressCardProps) {
  const { t } = useTranslation();
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
              {t('ocr.lastModified')}: {lastModified}
            </span>
            <span className={cn('text-xs', colorClass)}>
              {t('ocr.convertTo')} {convertTo}
            </span>
          </div>

          <div className="flex items-center w-full mt-1">
            <Progress
              percent={progress}
              size="small"
              strokeColor={
                isExcel
                  ? 'rgb(var(--color-success-lighter))'
                  : 'rgb(var(--color-primary-light))'
              }
              trailColor="rgb(var(--color-progress-trail))"
              format={percent => (
                <span className="text-sm font-medium text-text-secondary">
                  {percent}%
                </span>
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
