import { tv } from 'tailwind-variants';

export const circleButton = tv({
  base: 'items-center justify-center rounded-full bg-white shadow-sm',
  variants: {
    tone: {
      primary: 'bg-primary text-white',
      neutral: 'bg-white',
    },
  },
  defaultVariants: {
    tone: 'neutral',
  },
});
