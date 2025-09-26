import { ReactNode } from 'react';

import { cn } from '~/shared/utils/cn.util';

export type OcrImportCardProps = {
  icon: ReactNode;
  title: string;
  onClick?: () => void;
  className?: string;
};

export function OcrImportCard({
  icon,
  title,
  onClick,
  className,
}: OcrImportCardProps) {
  return (
    <div
      className={cn(
        'flex-1 bg-white rounded-2xl shadow-sm p-6 cursor-pointer hover:shadow-md transition-shadow',
        className
      )}
      onClick={onClick}
    >
      <div className="relative">
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[243px] h-[212px]">
          <svg
            width="244"
            height="136"
            viewBox="0 0 244 136"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute top-[35px] opacity-50"
          >
            <circle
              cx="121.5"
              cy="68"
              r="67.5"
              stroke="rgb(var(--color-stroke-light))"
              strokeWidth="1.36"
            />
          </svg>
          <svg
            width="244"
            height="136"
            viewBox="0 0 244 136"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute top-[76px]"
          >
            <circle
              cx="121.5"
              cy="68"
              r="67.5"
              stroke="rgb(var(--color-stroke-light))"
              strokeWidth="1.36"
            />
          </svg>
          <svg
            width="244"
            height="136"
            viewBox="0 0 244 136"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute top-0 opacity-70"
          >
            <circle
              cx="121.5"
              cy="68"
              r="67.5"
              stroke="rgb(var(--color-stroke-light))"
              strokeWidth="1.36"
            />
          </svg>
        </div>
      </div>

      <div className="flex flex-col items-center mt-24">
        <div className="mb-4">{icon}</div>
        <span className="text-[28px] text-black-2">{title}</span>
      </div>
    </div>
  );
}
