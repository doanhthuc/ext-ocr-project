import { clamp } from 'lodash-es';

export function alpha(color: string, opacity: number): string {
  const hex = color.replace('#', '');

  const hex6Digits = hex.length === 3 ? `${hex}${hex}` : hex;

  const r = parseInt(hex6Digits.substring(0, 2), 16);
  const g = parseInt(hex6Digits.substring(2, 4), 16);
  const b = parseInt(hex6Digits.substring(4, 6), 16);

  return `rgba(${r}, ${g}, ${b}, ${clamp(opacity, 0, 1)})`;
}
