import { X } from '@phosphor-icons/react';

import { cn } from '~shared/utils/cn.util';

export type CloseButtonProps = {
  onClick: () => void;
  className?: string;
  size?: number;
};

export function CloseButton({
  onClick,
  className,
  size = 28,
}: CloseButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'flex items-center justify-center rounded-full bg-white transition-colors duration-200 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
        className
      )}
      style={{ width: size, height: size }}
      aria-label="Close modal"
    >
      <X size={16} weight="regular" className="text-gray-800" />
    </button>
  );
}
