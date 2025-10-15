import SearchEmptyImage from '~/assets/images/search-empty.svg';
import { cn } from '~shared/utils/cn.util';

export type OcrEmptyStateStep = {
  number: number;
  text: string;
};

export type OcrEmptyStateProps = {
  steps?: Array<OcrEmptyStateStep>;
  className?: string;
};

const DEFAULT_STEPS: Array<OcrEmptyStateStep> = [
  {
    number: 1,
    text: 'Upload an image/select the file for OCR processing',
  },
  {
    number: 2,
    text: 'Choose templates or edit them yourself',
  },
  {
    number: 3,
    text: 'Click OCR Now and receive the results',
  },
];

export function OcrEmptyState({
  steps = DEFAULT_STEPS,
  className,
}: OcrEmptyStateProps) {
  return (
    <div
      className={cn(
        'bg-white border border-solid border-border-light rounded-xl',
        'flex flex-col items-center justify-center gap-6 p-4',
        className
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

      {/* Steps Container */}
      <div className="flex flex-col items-start justify-center">
        {steps.map((step, index) => (
          <div key={step.number} className="flex gap-3 items-center">
            {/* Step Number with Connector Lines */}
            <div className="flex flex-col items-center justify-center">
              {/* Top connector line (hidden for first item) */}
              <div
                className={cn(
                  'w-px h-2 bg-gray-12',
                  index === 0 && 'invisible'
                )}
              />

              {/* Number Badge */}
              <div className="bg-gray-12 rounded-full px-2 py-0.5 flex items-center justify-center">
                <span className="text-sm font-medium leading-5 text-text-muted">
                  {step.number}
                </span>
              </div>

              {/* Bottom connector line (hidden for last item) */}
              <div
                className={cn(
                  'w-px h-2 bg-gray-12',
                  index === steps.length - 1 && 'invisible'
                )}
              />
            </div>

            {/* Step Text */}
            <p className="text-sm font-normal leading-5 text-text-muted">
              {step.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
