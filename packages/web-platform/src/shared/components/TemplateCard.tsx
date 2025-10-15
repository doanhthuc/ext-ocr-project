import { Checkbox } from 'antd';
import React from 'react';

import { cn } from '~shared/utils/cn.util';

export type TemplateCardProps = {
  title: string;
  lastModified: string;
  checked?: boolean;
  onClick?: () => void;
  onChange?: (checked: boolean) => void;
  className?: string;
  disabled?: boolean;
  value?: string;
  name?: string;
};

export function TemplateCard({
  title,
  lastModified,
  checked = false,
  onClick,
  onChange,
  className,
  disabled = false,
  value,
  name,
}: TemplateCardProps) {
  const handleClick = () => {
    if (disabled) return;

    if (onChange) {
      onChange(!checked);
    }

    if (onClick) {
      onClick();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;

    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <div
      role="checkbox"
      aria-checked={checked}
      aria-disabled={disabled}
      tabIndex={disabled ? -1 : 0}
      data-value={value}
      data-name={name}
      className={cn(
        'bg-white border border-solid border-gray-12 rounded-lg overflow-hidden shrink-0',
        'transition-all duration-200',
        !disabled && 'cursor-pointer hover:border-blue-4',
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      <div className="flex gap-1 items-start p-3">
        {/* Content */}
        <div className="flex-1 flex flex-col gap-1 min-w-0">
          {/* Title */}
          <div className="text-sm font-medium leading-5 text-gray-13 truncate">
            {title}
          </div>
          {/* Last Modified */}
          <div className="text-xs font-normal leading-4 text-gray-11 truncate">
            {lastModified}
          </div>
        </div>

        {/* Checkbox */}
        <div className="flex-shrink-0">
          <Checkbox checked={checked} disabled={disabled} />
        </div>
      </div>
    </div>
  );
}
