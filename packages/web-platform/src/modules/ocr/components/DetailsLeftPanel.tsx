import { useState } from 'react';

import mockBillImage from '~/assets/images/template-bill-restaurant-21c4bc.png';
import { ImageCarousel } from '~/ocr/components/ImageCarousel';
import { ThumbnailList } from '~/ocr/components/ThumbnailList';
import { IconArrowLeft01Sharp } from '~icons';

type DetailsLeftPanelProps = {
  fileName?: string;
  images?: Array<string>;
  onBack?: () => void;
};

export function DetailsLeftPanel({
  fileName = 'bill-01.png',
  images = [
    mockBillImage,
    mockBillImage,
    mockBillImage,
    mockBillImage,
    mockBillImage,
  ],
  onBack,
}: DetailsLeftPanelProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const handlePrevious = () => {
    setSelectedImageIndex(prev => (prev > 0 ? prev - 1 : images.length - 1));
  };

  const handleNext = () => {
    setSelectedImageIndex(prev => (prev < images.length - 1 ? prev + 1 : 0));
  };

  return (
    <div className="bg-white rounded-xl flex flex-col gap-3 h-full overflow-hidden p-4">
      {/* Header with back button and filename */}
      <div className="flex items-center gap-2 shrink-0">
        <button
          onClick={onBack}
          className="flex items-center justify-center size-5 text-text-dark hover:text-text-placeholder transition-colors"
          aria-label="Go back"
        >
          <IconArrowLeft01Sharp className="size-5" />
        </button>
        <h2 className="font-archivo text-base font-semibold text-text-dark leading-6">
          {fileName}
        </h2>
      </div>

      {/* Image preview with navigation */}
      <div className="flex-1 flex flex-col gap-3 overflow-hidden">
        {/* Main image carousel */}
        <ImageCarousel
          images={images}
          currentIndex={selectedImageIndex}
          alt={fileName}
          onPrevious={handlePrevious}
          onNext={handleNext}
        />

        {/* Thumbnail list */}
        <ThumbnailList
          images={images}
          selectedIndex={selectedImageIndex}
          alt={fileName}
          onSelectImage={setSelectedImageIndex}
        />
      </div>
    </div>
  );
}
