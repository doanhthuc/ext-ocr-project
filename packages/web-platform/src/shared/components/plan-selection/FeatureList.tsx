import { Check } from '@phosphor-icons/react';

import type { PlanFeature } from '~shared/types/plan.types';

import { cn } from '~shared/utils/cn.util';

export type FeatureListProps = {
  features: Array<PlanFeature>;
  className?: string;
};

export function FeatureList({ features, className }: FeatureListProps) {
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      {features.map(feature => (
        <div key={feature.id} className="flex items-center gap-1">
          <div
            className={cn(
              'flex items-center justify-center w-4 h-4 rounded-full',
              feature.isIncluded
                ? 'bg-blue-600 border border-blue-600'
                : 'bg-gray-100 border border-gray-300'
            )}
          >
            {feature.isIncluded && (
              <Check size={10} weight="bold" className="text-white" />
            )}
          </div>
          <span
            className={cn(
              'text-sm',
              feature.isIncluded ? 'text-gray-800' : 'text-gray-500'
            )}
          >
            {feature.text}
          </span>
        </div>
      ))}
    </div>
  );
}
