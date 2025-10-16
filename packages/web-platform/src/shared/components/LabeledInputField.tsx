import type { InputHTMLAttributes } from 'react';
import type { Control, FieldPath, FieldValues } from 'react-hook-form';

import { Controller } from 'react-hook-form';

import { IconDelete02, IconEdit02 } from '~icons';
import { cn } from '~shared/utils/cn.util';

export type LabeledInputFieldProps<
  TFieldValues extends FieldValues = FieldValues,
> = {
  /** The label text to display above the input */
  label: string;
  /** The input value (used when not using react-hook-form) */
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
  /** Optional error message to display */
  error?: string;
  /** React Hook Form control object (optional) */
  control?: Control<TFieldValues>;
  /** Field name for react-hook-form (required if control is provided) */
  name?: FieldPath<TFieldValues>;
} & Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'className' | 'value' | 'placeholder' | 'disabled'
>;

export function LabeledInputField<
  TFieldValues extends FieldValues = FieldValues,
>({
  label,
  value = '',
  placeholder = '-',
  disabled = false,
  readonly = false,
  onEdit,
  onDelete,
  className,
  error,
  control,
  name,
  ...inputProps
}: LabeledInputFieldProps<TFieldValues>) {
  // If using react-hook-form
  if (control && name) {
    return (
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => {
          const displayValue = field.value || placeholder;
          const isPlaceholder = !field.value;
          const errorMessage = error || fieldState.error?.message;

          return (
            <div className={cn('flex w-full flex-col gap-1', className)}>
              {/* Label */}
              <label className="font-archivo text-sm font-normal leading-5 text-text-dark">
                {label}
              </label>

              {/* Input Field Container */}
              <div
                className={cn(
                  'flex w-full items-center justify-between rounded-lg border bg-white px-4 py-2.5',
                  errorMessage ? 'border-red-6' : 'border-gray-12'
                )}
              >
                {/* Input/Text Value */}
                <div className="flex min-w-0 grow items-center">
                  {readonly ? (
                    <span
                      className={cn(
                        'min-w-0 grow font-archivo text-sm font-normal leading-5',
                        isPlaceholder
                          ? 'text-text-placeholder'
                          : 'text-text-dark'
                      )}
                    >
                      {displayValue}
                    </span>
                  ) : (
                    <input
                      {...field}
                      {...inputProps}
                      placeholder={placeholder}
                      disabled={disabled}
                      className={cn(
                        'min-w-0 grow border-none bg-transparent font-archivo text-sm font-normal leading-5 outline-none',
                        isPlaceholder || !field.value
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

              {/* Error Message */}
              {errorMessage && (
                <span className="font-archivo text-xs text-red-6">
                  {errorMessage}
                </span>
              )}
            </div>
          );
        }}
      />
    );
  }

  // Traditional prop-based approach (backward compatibility)
  const displayValue = value || placeholder;
  const isPlaceholder = !value;

  return (
    <div className={cn('flex w-full flex-col gap-1', className)}>
      {/* Label */}
      <label className="font-archivo text-sm font-normal leading-5 text-text-dark">
        {label}
      </label>

      {/* Input Field Container */}
      <div
        className={cn(
          'flex w-full items-center justify-between rounded-lg border bg-white px-4 py-2.5',
          error ? 'border-red-6' : 'border-gray-12'
        )}
      >
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

      {/* Error Message */}
      {error && (
        <span className="font-archivo text-xs text-red-6">{error}</span>
      )}
    </div>
  );
}
