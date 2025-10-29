import type { OcrCell } from '~/ocr/types/ocr-result.type';

import mockBillImage from '~/assets/images/template-bill-restaurant-21c4bc.png';
import { ImageCarousel } from '~/ocr/components/ImageCarousel';
import { ThumbnailList } from '~/ocr/components/ThumbnailList';
import { useTranslateDetailsStore } from '~/translate/stores/translate-details.store';
import { IconArrowLeft01Sharp } from '~icons';
import { mockImages, mockOcrResults } from '~shared/mock';

type TranslateDetailsLeftPanelProps = {
  fileName?: string;
  images?: Array<string>;
  ocrData?: Array<{
    cells: Array<OcrCell>;
    imageHeight: number;
    imageWidth: number;
  }>;
  onBack?: () => void;
  showBoundingBoxes?: boolean;
  useMockData?: boolean;
};

export function TranslateDetailsLeftPanel({
  fileName = 'document-01.png',
  images: propImages,
  ocrData: propOcrData,
  onBack,
  showBoundingBoxes = true,
  useMockData = false,
}: TranslateDetailsLeftPanelProps) {
  const { selectedImageIndex, setSelectedImageIndex } =
    useTranslateDetailsStore();

  // Use mock data if requested, otherwise use provided data or default mock bill images
  const images = useMockData
    ? mockImages
    : propImages || [
        mockBillImage,
        mockBillImage,
        mockBillImage,
        mockBillImage,
        mockBillImage,
      ];

  const ocrData = useMockData
    ? mockOcrResults.map(result => ({
        cells: result.cells,
        imageHeight: result.input_height,
        imageWidth: result.input_width,
      }))
    : propOcrData;

  const handlePrevious = () => {
    const newIndex =
      selectedImageIndex > 0 ? selectedImageIndex - 1 : images.length - 1;
    setSelectedImageIndex(newIndex);
  };

  const handleNext = () => {
    const newIndex =
      selectedImageIndex < images.length - 1 ? selectedImageIndex + 1 : 0;
    setSelectedImageIndex(newIndex);
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
          ocrData={ocrData}
          showBoundingBoxes={showBoundingBoxes}
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
