import React from 'react';

import { cn } from '~shared/utils/cn.util';

export type TemplateCardProps = {
  /**
   * Template name/title displayed below the image
   */
  title: string;
  /**
   * Image source URL for the template preview
   */
  imageUrl: string;
  /**
   * Whether the template is selected/checked
   */
  selected?: boolean;
  /**
   * Callback when the selection state changes
   */
  onSelectionChange?: (selected: boolean) => void;
  /**
   * Callback when the card is clicked
   */
  onClick?: () => void;
  /**
   * Custom className for styling
   */
  className?: string;
  /**
   * Whether the card is disabled
   */
  disabled?: boolean;
};

export function TemplateCard({
  title,
  imageUrl,
  selected = false,
  onSelectionChange,
  onClick,
  className,
  disabled = false,
}: TemplateCardProps) {
  const handleCheckboxChange = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (disabled) return;
    onSelectionChange?.(!selected);
  };

  const handleCardClick = () => {
    if (disabled) return;
    onClick?.();
  };

  return (
    <div
      className={cn(
        // Base card styles matching Figma design
        'w-[158px] bg-white border border-[#2970FF] rounded-lg shadow-sm',
        'flex flex-col items-center gap-2 pb-2 transition-all duration-200',
        // Hover and interaction states
        !disabled && 'hover:shadow-md cursor-pointer',
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
      onClick={handleCardClick}
    >
      {/* Image container with checkbox overlay */}
      <div className="relative w-full h-[120px] overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover rounded-t-lg"
          style={{
            // Apply the crop transform from Figma if needed
            objectPosition: '19% 9%', // Approximate equivalent of the Figma crop
          }}
        />

        {/* Checkbox overlay */}
        <div
          className="absolute top-2 right-2 w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all duration-200 cursor-pointer"
          style={{
            backgroundColor: selected ? '#2970FF' : '#F5F8FF',
            borderColor: '#2970FF',
          }}
          onClick={handleCheckboxChange}
        >
          {selected && (
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-3.5 h-3.5"
            >
              <path
                d="M11.6666 3.5L5.24992 9.91667L2.33325 7"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </div>
      </div>

      {/* Title */}
      <div className="w-full px-2">
        <p className="text-xs font-normal text-[#30374F] text-center leading-[18px]">
          {title}
        </p>
      </div>
    </div>
  );
}
