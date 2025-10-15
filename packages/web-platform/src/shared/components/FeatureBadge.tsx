import { cn } from '~shared/utils/cn.util';

type FeatureBadgeProps = {
  value: string;
  className?: string;
};

export function FeatureBadge({ value, className }: FeatureBadgeProps) {
  return (
    <div
      className={cn(
        'inline-flex items-center justify-center gap-2.5 px-4 py-2.5 rounded-full border border-[#000c25] backdrop-blur-[9px]',
        className
      )}
      style={{
        background:
          'linear-gradient(to right, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.165))',
      }}
    >
      {/* Decorative dot */}
      <div className="w-3 h-3 rounded-full bg-white flex-shrink-0" />

      {/* Text */}
      <span className="text-white text-base font-semibold leading-4 whitespace-nowrap">
        {value}
      </span>
    </div>
  );
}
