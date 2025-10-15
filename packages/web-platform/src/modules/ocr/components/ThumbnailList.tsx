import { useEffect, useRef } from 'react';

import { cn } from '~shared/utils/cn.util';

type ThumbnailListProps = {
  alt: string;
  images: Array<string>;
  onSelectImage: (index: number) => void;
  selectedIndex: number;
};

export function ThumbnailList({
  alt,
  images,
  onSelectImage,
  selectedIndex,
}: ThumbnailListProps) {
  const selectedThumbnailRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectedThumbnailRef.current) {
      // Always scroll to center the selected thumbnail
      selectedThumbnailRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });
    }
  }, [selectedIndex]);

  if (images.length <= 1) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      className="flex gap-3 overflow-x-auto pb-1 shrink-0"
    >
      {images.map((image, index) => (
        <button
          key={index}
          ref={selectedIndex === index ? selectedThumbnailRef : null}
          onClick={() => onSelectImage(index)}
          className={cn(
            'relative shrink-0 w-[130px] h-[130px] rounded-xl overflow-hidden border-2 transition-all',
            selectedIndex === index
              ? 'border-primary ring-2 ring-primary/20'
              : 'border-border-light hover:border-border-secondary'
          )}
          aria-label={`View image ${index + 1}`}
        >
          <img
            src={image}
            alt={`${alt} thumbnail ${index + 1}`}
            className="w-full h-full object-cover"
          />
        </button>
      ))}
    </div>
  );
}
