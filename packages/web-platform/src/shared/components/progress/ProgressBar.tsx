import { cn } from '~shared/utils/cn.util';

type ProgressBarProps = {
  value: number;
  max: number;
  label?: string;
  className?: string;
};

export function ProgressBar({
  value,
  max,
  label,
  className,
}: ProgressBarProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  return (
    <div className={cn('flex items-center gap-3 w-full', className)}>
      <div className="h-2 bg-[#E4E7EC] rounded-full flex-1">
        <div
          className="h-full bg-[#2970FF] rounded-full"
          style={{ width: `${percentage}%` }}
        />
      </div>
      {label && (
        <span className="text-sm font-medium text-[#344054]">{label}</span>
      )}
    </div>
  );
}
