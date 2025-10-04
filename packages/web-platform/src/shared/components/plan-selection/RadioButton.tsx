import { cn } from '~shared/utils/cn.util';

export type RadioButtonProps = {
  checked: boolean;
  onChange: () => void;
  className?: string;
  size?: 'sm' | 'md';
};

export function RadioButton({
  checked,
  onChange,
  className,
  size = 'md',
}: RadioButtonProps) {
  return (
    <button
      type="button"
      onClick={onChange}
      className={cn(
        'relative flex items-center justify-center rounded-full border-2 transition-all duration-200',
        {
          'w-5 h-5': size === 'md',
          'w-4 h-4': size === 'sm',
        },
        checked
          ? 'border-blue-500 bg-gradient-to-b from-blue-400 to-blue-600'
          : 'border-gray-300 bg-white hover:border-gray-400',
        className
      )}
    >
      {checked && (
        <div
          className={cn(
            'rounded-full bg-white',
            size === 'md' ? 'w-2 h-2' : 'w-1.5 h-1.5'
          )}
        />
      )}
    </button>
  );
}
