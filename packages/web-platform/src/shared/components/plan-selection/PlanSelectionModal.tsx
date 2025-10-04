import { useEffect, useState } from 'react';

import type { PlanSelectionModalProps } from '~shared/types/plan.types';

import { CloseButton } from './CloseButton';
import { PlanCard } from './PlanCard';
import { SubscribeButton } from './SubscribeButton';

export function PlanSelectionModal({
  isOpen,
  onClose,
  plans,
  selectedPlanId,
  onPlanSelect,
  onSubscribe,
  loading = false,
}: PlanSelectionModalProps) {
  const [currentSelectedId, setCurrentSelectedId] = useState(selectedPlanId);

  useEffect(() => {
    setCurrentSelectedId(selectedPlanId);
  }, [selectedPlanId]);

  const handlePlanSelect = (planId: string) => {
    setCurrentSelectedId(planId);
    onPlanSelect(planId);
  };

  const handleSubscribe = () => {
    if (currentSelectedId) {
      onSubscribe(currentSelectedId);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md mx-4 bg-white rounded-xl shadow-xl">
        {/* Close Button */}
        <CloseButton
          onClick={onClose}
          className="absolute top-5 right-5 z-10"
        />

        {/* Content */}
        <div className="p-6 space-y-3">
          {/* Header */}
          <div className="text-center space-y-2">
            <h2 className="text-base font-semibold text-gray-800">
              Choose your plan
            </h2>
            {/* Illustration placeholder */}
            <div className="mx-auto w-[70px] h-20 bg-gray-100 rounded-lg flex items-center justify-center">
              <svg
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="4"
                  y="8"
                  width="32"
                  height="24"
                  rx="4"
                  fill="#E5F3FF"
                  stroke="#3B82F6"
                  strokeWidth="2"
                />
                <circle cx="20" cy="20" r="6" fill="#3B82F6" />
                <circle cx="20" cy="20" r="2" fill="white" />
              </svg>
            </div>
          </div>

          {/* Plan Cards */}
          <div className="space-y-3">
            {plans.map(plan => (
              <PlanCard
                key={plan.id}
                plan={plan}
                isSelected={currentSelectedId === plan.id}
                onSelect={handlePlanSelect}
              />
            ))}
          </div>

          {/* Subscribe Button */}
          <SubscribeButton
            onClick={handleSubscribe}
            loading={loading}
            disabled={!currentSelectedId}
            className="mt-6"
          >
            Subscribe Now
          </SubscribeButton>
        </div>
      </div>
    </div>
  );
}
