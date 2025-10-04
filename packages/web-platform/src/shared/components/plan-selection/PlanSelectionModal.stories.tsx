import type { Meta, StoryObj } from '@storybook/react-vite';

import { useState } from 'react';

import type { Plan } from '~shared/types/plan.types';

import { PlanSelectionModal } from '~shared/components';

const mockPlans: Array<Plan> = [
  {
    id: 'premium',
    name: 'Premium plan',
    type: 'premium',
    price: '$59,99/2,000 page',
    description: 'Included Smart OCR and Translate',
    isSelected: true,
    isPopular: true,
    features: [
      {
        id: 'scan-credit-premium',
        text: 'Scan Credit: 2,000 Page',
        isIncluded: true,
      },
      {
        id: 'translate-credit-premium',
        text: 'Translate Credit: 2,000 Page',
        isIncluded: true,
      },
      {
        id: 'priority-support',
        text: 'Priority Support',
        isIncluded: true,
      },
      {
        id: 'advanced-ocr',
        text: 'Advanced OCR Features',
        isIncluded: true,
      },
    ],
  },
  {
    id: 'basic',
    name: 'Basic plan',
    type: 'basic',
    price: '$29,99/1,000 page',
    description: 'Included Smart OCR and Translate',
    isSelected: false,
    features: [
      {
        id: 'scan-credit-basic',
        text: 'Scan Credit: 1,000 Page',
        isIncluded: true,
      },
      {
        id: 'translate-credit-basic',
        text: 'Translate Credit: 1,000 Page',
        isIncluded: true,
      },
      {
        id: 'standard-support',
        text: 'Standard Support',
        isIncluded: true,
      },
      {
        id: 'basic-ocr',
        text: 'Basic OCR Features',
        isIncluded: true,
      },
    ],
  },
  {
    id: 'free',
    name: 'Free Plan',
    type: 'free',
    price: '10 page Free',
    description: 'Included Smart OCR and Translate',
    isSelected: false,
    features: [
      {
        id: 'scan-credit-free',
        text: 'Scan Credit: 10 Page',
        isIncluded: true,
      },
      {
        id: 'translate-credit-free',
        text: 'Translate Credit: 10 Page',
        isIncluded: true,
      },
      {
        id: 'community-support',
        text: 'Community Support',
        isIncluded: true,
      },
      {
        id: 'basic-features',
        text: 'Basic Features Only',
        isIncluded: true,
      },
    ],
  },
];

const meta: Meta<typeof PlanSelectionModal> = {
  title: 'Components/PlanSelectionModal',
  component: PlanSelectionModal,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    isOpen: {
      control: 'boolean',
    },
    loading: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

function PlanSelectionModalExample() {
  const [isOpen, setIsOpen] = useState(true);
  const [selectedPlanId, setSelectedPlanId] = useState('premium');
  const [loading, setLoading] = useState(false);

  const handlePlanSelect = (planId: string) => {
    setSelectedPlanId(planId);
  };

  const handleSubscribe = (planId: string) => {
    setLoading(true);
    console.log('Subscribing to plan:', planId);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setIsOpen(false);
      alert(`Subscribed to plan: ${planId}`);
    }, 2000);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Open Plan Selection Modal
      </button>

      <PlanSelectionModal
        isOpen={isOpen}
        onClose={handleClose}
        plans={mockPlans}
        selectedPlanId={selectedPlanId}
        onPlanSelect={handlePlanSelect}
        onSubscribe={handleSubscribe}
        loading={loading}
      />
    </div>
  );
}

export const Default: Story = {
  render: () => <PlanSelectionModalExample />,
};

export const WithLoading: Story = {
  args: {
    isOpen: true,
    plans: mockPlans,
    selectedPlanId: 'premium',
    loading: true,
    onClose: () => console.log('Close clicked'),
    onPlanSelect: (planId: string) => console.log('Plan selected:', planId),
    onSubscribe: (planId: string) => console.log('Subscribe clicked:', planId),
  },
};

export const NoSelection: Story = {
  args: {
    isOpen: true,
    plans: mockPlans,
    selectedPlanId: undefined,
    loading: false,
    onClose: () => console.log('Close clicked'),
    onPlanSelect: (planId: string) => console.log('Plan selected:', planId),
    onSubscribe: (planId: string) => console.log('Subscribe clicked:', planId),
  },
};
