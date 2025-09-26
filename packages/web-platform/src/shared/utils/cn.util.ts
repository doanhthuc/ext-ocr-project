/* eslint-disable no-restricted-imports */
import { type ClassValue, clsx } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

import { COLORS } from '~config/tailwind-variables.config';

const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      color: COLORS,
    },
  },
});

export const cn = (...args: Array<ClassValue>) => twMerge(clsx(args));
