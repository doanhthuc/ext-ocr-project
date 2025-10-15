import { IconArrowLeft01Sharp } from '~icons';

type ImageCarouselProps = {
  alt: string;
  currentIndex: number;
  images: Array<string>;
  onNext: () => void;
  onPrevious: () => void;
  showNavigation?: boolean;
};

export function ImageCarousel({
  alt,
  currentIndex,
  images,
  onNext,
  onPrevious,
  showNavigation = true,
}: ImageCarouselProps) {
  return (
    <div className="relative flex-1 rounded-xl overflow-hidden bg-bg-tertiary">
      <img
        src={images[currentIndex]}
        alt={`${alt} - Image ${currentIndex + 1}`}
        className="w-full h-full object-contain"
      />

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
