import type { OcrCell } from '~/ocr/types/ocr-result.type';

import { IconArrowLeft01Sharp } from '~icons';

import { BoundingBoxOverlay } from './BoundingBoxOverlay';

type ImageCarouselProps = {
  alt: string;
  currentIndex: number;
  images: Array<string>;
  ocrData?: Array<{
    cells: Array<OcrCell>;
    imageHeight: number;
    imageWidth: number;
  }>;
  onNext: () => void;
  onPrevious: () => void;
  showBoundingBoxes?: boolean;
  showNavigation?: boolean;
};

export function ImageCarousel({
  alt,
  currentIndex,
  images,
  ocrData,
  onNext,
  onPrevious,
  showBoundingBoxes = true,
  showNavigation = true,
}: ImageCarouselProps) {
  const currentOcrData = ocrData?.[currentIndex];
  return (
    <div className="relative flex-1 rounded-xl overflow-hidden bg-bg-tertiary">
      <img
        src={images[currentIndex]}
        alt={`${alt} - Image ${currentIndex + 1}`}
        className="w-full h-full object-contain"
      />

      {/* Bounding box overlay */}
      {currentOcrData && (
        <BoundingBoxOverlay
          cells={currentOcrData.cells}
          imageWidth={currentOcrData.imageWidth}
          imageHeight={currentOcrData.imageHeight}
          showBoxes={showBoundingBoxes}
        />
      )}

      {/* Navigation arrows */}
      {showNavigation && images.length > 1 && (
        <>
          <button
            onClick={onPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 size-12 rounded-full bg-gray-11/80 hover:bg-gray-11 flex items-center justify-center text-white transition-colors"
            aria-label="Previous image"
          >
            <IconArrowLeft01Sharp className="size-6" />
          </button>
          <button
            onClick={onNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 size-12 rounded-full bg-gray-11/80 hover:bg-gray-11 flex items-center justify-center text-white transition-colors"
            aria-label="Next image"
          >
            <IconArrowLeft01Sharp className="size-6 rotate-180" />
          </button>
        </>
      )}
    </div>
  );
}
