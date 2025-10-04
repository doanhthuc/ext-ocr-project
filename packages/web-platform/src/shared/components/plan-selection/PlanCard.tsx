import type { Plan } from '~shared/types/plan.types';

import { cn } from '~shared/utils/cn.util';

import { FeatureList } from './FeatureList';
import { RadioButton } from './RadioButton';

export type PlanCardProps = {
  plan: Plan;
  isSelected: boolean;
  onSelect: (planId: string) => void;
  className?: string;
};

export function PlanCard({
  plan,
  isSelected,
  onSelect,
  className,
}: PlanCardProps) {
  const handleSelect = () => {
    onSelect(plan.id);
  };

  return (
    <div
      className={cn(
        'relative flex p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer',
        isSelected
          ? 'border-blue-500 bg-white'
          : 'border-gray-200 bg-white hover:border-gray-300',
        className
      )}
      onClick={handleSelect}
    >
      <div className="flex w-full gap-3">
        {/* Radio Button */}
        <div className="flex items-start pt-0.5">
          <RadioButton checked={isSelected} onChange={handleSelect} />
        </div>

        {/* Content */}
        <div className="flex-1 space-y-2">
          {/* Plan Name and Price */}
          <div className="space-y-1.5">
            <div className="space-y-1">
              <h3 className="text-base font-medium text-gray-800">
                {plan.name}
              </h3>
              <p className="text-base font-semibold text-blue-600">
                {plan.price}
              </p>
            </div>
            <p className="text-sm text-gray-800">{plan.description}</p>
          </div>

          {/* Features */}
          <FeatureList features={plan.features} />
        </div>
      </div>

      {/* Popular Badge (if applicable) */}
      {plan.isPopular && (
        <div className="absolute -top-2 left-4">
          <div className="bg-blue-600 text-white text-xs font-medium px-2 py-1 rounded-full">
            Most Popular
          </div>
        </div>
      )}
    </div>
  );
}
