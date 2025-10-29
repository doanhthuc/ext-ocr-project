import { Progress } from 'antd';

import { cn } from '~/shared/utils/cn.util';
import { useTranslation } from '~shared/hooks/useTranslation';

export type TranslateProgressCardProps = {
  thumbnail?: string;
  fileName: string;
  lastModified: string;
  progress: number;
  isCompleted?: boolean;
  className?: string;
};

export function TranslateProgressCard({
  thumbnail,
  fileName,
  lastModified,
  progress,
  isCompleted = false,
  className,
}: TranslateProgressCardProps) {
  const { t } = useTranslation();

  return (
    <div
      className={cn(
        'flex items-center gap-3 p-3 bg-white rounded-xl shadow-sm',
        className
      )}
    >
      <div className="h-16 w-16 bg-bg-secondary rounded-md overflow-hidden flex-shrink-0">
        {thumbnail && (
          <img
            src={thumbnail}
            alt={fileName}
            className="w-full h-full object-cover"
          />
        )}
      </div>

      <div className="flex flex-col gap-1 flex-1 min-w-0">
        <span className="text-sm font-medium text-[#091e42] truncate">
          {fileName}
        </span>
        <span className="text-xs text-[#505f79]">
          {t('translate.lastModified')}: {lastModified}
        </span>

        {isCompleted ? (
          <span className="text-xs text-[#12b76a]">
            {t('translate.completed')}
          </span>
        ) : (
          <div className="flex items-center w-full gap-3">
            <Progress
              percent={progress}
              size="small"
              strokeColor="#2970ff"
              trailColor="#e4e7ec"
              showInfo={false}
              className="flex-1"
            />
            <span className="text-sm font-medium text-[#293056] flex-shrink-0">
              {progress}%
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
