export type PlanFeature = {
  id: string;
  text: string;
  isIncluded: boolean;
};

export type Plan = {
  id: string;
  name: string;
  type: 'free' | 'basic' | 'premium';
  price: string;
  description: string;
  features: Array<PlanFeature>;
  isSelected: boolean;
  isPopular?: boolean;
};

export type PlanSelectionModalProps = {
  isOpen: boolean;
  onClose: () => void;
  plans: Array<Plan>;
  selectedPlanId?: string;
  onPlanSelect: (planId: string) => void;
  onSubscribe: (planId: string) => void;
  loading?: boolean;
};
