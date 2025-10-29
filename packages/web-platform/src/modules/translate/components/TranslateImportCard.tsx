import { ReactNode } from 'react';

import { cn } from '~/shared/utils/cn.util';

export type TranslateImportCardProps = {
  icon: ReactNode;
  title: string;
  onClick?: () => void;
  className?: string;
};

export function TranslateImportCard({
  icon,
  title,
  onClick,
  className,
}: TranslateImportCardProps) {
  return (
    <div
      className={cn(
        'flex-1 bg-white rounded-xl overflow-hidden p-6 cursor-pointer hover:shadow-md transition-shadow flex flex-col gap-4',
        className
      )}
      onClick={onClick}
    >
      <div className="w-14 h-14">{icon}</div>
      <p className="text-[22px] font-medium leading-8 text-[#0C2042]">
        {title}
      </p>
    </div>
  );
}
