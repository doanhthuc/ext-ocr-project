import { cn } from '~shared/utils/cn.util';

import type { FieldData } from './KeyValueFieldList';

import { LabeledInputField } from './LabeledInputField';

export type ReadOnlyKeyValueFieldListProps = {
  /** Array of field data to display in read-only mode */
  fields?: Array<FieldData>;
  /** Additional class name for the container */
  className?: string;
};

export function ReadOnlyKeyValueFieldList({
  fields = [],
  className,
}: ReadOnlyKeyValueFieldListProps) {
  return (
    <div
      className={cn(
        'flex size-full flex-col gap-4 rounded-xl border border-border-light bg-white p-4',
        className
      )}
    >
      {/* Fields List */}
      {fields.map((field, index) => (
        <LabeledInputField
          key={field.id || `field-${index}`}
          label={field.label}
          value={field.value}
          placeholder="-"
          readonly={true}
        />
      ))}

      {/* Empty State */}
      {fields.length === 0 && (
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <p className="font-archivo text-sm text-text-placeholder">
            No fields available
          </p>
        </div>
      )}
    </div>
  );
}
