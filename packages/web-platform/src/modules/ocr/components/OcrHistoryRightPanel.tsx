import SearchEmptyImage from '~/assets/images/search-empty.svg';
import { cn } from '~shared/utils/cn.util';

export function OcrHistoryRightPanel() {
  return (
    <div className="bg-white rounded-xl flex flex-col h-full overflow-hidden">
      <h3 className="text-base font-semibold text-text-secondary leading-6 shrink-0 p-4 pb-0">
        OCR Results Details
      </h3>
      <div className="p-4 flex-1 flex">
        <div
          className={cn(
            'bg-white border border-solid border-border-light rounded-xl',
            'flex flex-col items-center justify-center gap-6 p-4 flex-1'
          )}
        >
          {/* Search Illustration */}
          <div className="w-[93.6px] h-[103.68px]">
            <img
              src={SearchEmptyImage}
              alt="Empty state illustration"
              className="w-full h-full"
            />
          </div>

          {/* Description */}
          <div className="text-center text-text-placeholder">
            <p className="text-sm font-medium">Select 1 item to view details</p>
          </div>
        </div>
      </div>
      <div className="bg-white border-t border-gray-12 flex items-center justify-end gap-3 p-4 shrink-0 h-14" />
    </div>
  );
}
