import type { OcrCell } from '~/ocr/types/ocr-result.type';

import mockBillImage from '~/assets/images/template-bill-restaurant-21c4bc.png';
import { IconArrowLeft01Sharp } from '~icons';

import { ImageCarousel } from './ImageCarousel';

type HistoryDetailsLeftPanelProps = {
  fileName?: string;
  image?: string;
  ocrData?: Array<{
    cells: Array<OcrCell>;
    imageHeight: number;
    imageWidth: number;
  }>;
  onBack?: () => void;
  showBoundingBoxes?: boolean;
};

export function HistoryDetailsLeftPanel({
  fileName = 'document.png',
  image = mockBillImage,
  ocrData,
  onBack,
  showBoundingBoxes = true,
}: HistoryDetailsLeftPanelProps) {
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

      {/* Image display */}
      <div className="flex-1 flex flex-col gap-3 overflow-hidden">
        <ImageCarousel
          images={[image]}
          currentIndex={0}
          alt={fileName}
          // eslint-disable-next-line @typescript-eslint/no-empty-function
          onPrevious={() => {}}
          // eslint-disable-next-line @typescript-eslint/no-empty-function
          onNext={() => {}}
          ocrData={ocrData}
          showBoundingBoxes={showBoundingBoxes}
          showNavigation={false}
        />
      </div>
    </div>
  );
}
