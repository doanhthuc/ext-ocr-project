import type { InputHTMLAttributes } from 'react';

import { IconDelete02, IconEdit02 } from '~icons';
import { cn } from '~shared/utils/cn.util';

export type LabeledInputFieldProps = {
  /** The label text to display above the input */
  label: string;
  /** The input value */
  value?: string;
  /** Placeholder text when value is empty */
  placeholder?: string;
  /** Whether the input is disabled */
  disabled?: boolean;
  /** Whether the field is in readonly mode */
  readonly?: boolean;
  /** Callback when edit button is clicked */
  onEdit?: () => void;
  /** Callback when delete button is clicked */
  onDelete?: () => void;
  /** Additional class name for the container */
  className?: string;
} & Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'className' | 'value' | 'placeholder' | 'disabled'
>;

export function LabeledInputField({
  label,
  value = '',
  placeholder = '-',
  disabled = false,
  readonly = false,
  onEdit,
  onDelete,
  className,
  ...inputProps
}: LabeledInputFieldProps) {
  const displayValue = value || placeholder;
  const isPlaceholder = !value;

  return (
    <div className={cn('flex w-full flex-col gap-1', className)}>
      {/* Label */}
      <label className="font-archivo text-sm font-normal leading-5 text-text-dark">
        {label}
      </label>

      {/* Input Field Container */}
      <div className="flex w-full items-center justify-between rounded-lg border border-gray-12 bg-white px-4 py-2.5">
        {/* Input/Text Value */}
        <div className="flex min-w-0 grow items-center">
          {readonly ? (
            <span
              className={cn(
                'min-w-0 grow font-archivo text-sm font-normal leading-5',
                isPlaceholder ? 'text-text-placeholder' : 'text-text-dark'
              )}
            >
              {displayValue}
            </span>
          ) : (
            <input
              {...inputProps}
              value={value}
              placeholder={placeholder}
              disabled={disabled}
              className={cn(
                'min-w-0 grow border-none bg-transparent font-archivo text-sm font-normal leading-5 outline-none',
                isPlaceholder || !value
                  ? 'text-text-placeholder'
                  : 'text-text-dark',
                'placeholder:text-text-placeholder'
              )}
            />
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex shrink-0 items-center gap-3">
          {/* Edit Button */}
          {onEdit && (
            <button
              type="button"
              onClick={onEdit}
              disabled={disabled}
              className="flex size-6 items-center justify-center disabled:opacity-50"
              aria-label="Edit field"
            >
              <IconEdit02 className="size-6" />
            </button>
          )}

          {/* Delete Button */}
          {onDelete && (
            <button
              type="button"
              onClick={onDelete}
              disabled={disabled}
              className="flex size-6 items-center justify-center disabled:opacity-50"
              aria-label="Delete field"
            >
              <IconDelete02 className="size-6" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
