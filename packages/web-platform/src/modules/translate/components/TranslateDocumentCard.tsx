import { cn } from '~/shared/utils/cn.util';
import { useTranslation } from '~shared/hooks/useTranslation';

export type TranslateDocumentCardProps = {
  thumbnail?: string;
  fileName: string;
  lastModified: string;
  className?: string;
};

export function TranslateDocumentCard({
  thumbnail,
  fileName,
  lastModified,
  className,
}: TranslateDocumentCardProps) {
  const { t } = useTranslation();

  return (
    <div
      className={cn(
        'flex items-start gap-3 p-3 bg-white rounded-xl shadow-sm cursor-pointer hover:shadow-md transition-shadow',
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
        <span className="text-xs text-[#7d89b0]">
          {t('translate.lastModified')}: {lastModified}
        </span>
      </div>
    </div>
  );
}
