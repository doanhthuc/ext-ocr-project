# KeyValueFieldList with React Hook Form - Usage Guide

This guide demonstrates how to use the refactored `KeyValueFieldList` and `LabeledInputField` components with React Hook Form and Zod validation.

## Quick Start

### 1. Import Required Dependencies

```typescript
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  keyValueFieldListSchema,
  type KeyValueFieldListFormData,
} from '~shared/schemas';
import { KeyValueFieldList } from '~shared/components';
```

### 2. Initialize React Hook Form

```typescript
const { control, handleSubmit, watch, setValue } = useForm<KeyValueFieldListFormData>({
  resolver: zodResolver(keyValueFieldListSchema),
  defaultValues: {
    selectedTemplate: 'Template Bill Restaurant',
    fields: [
      { id: '1', label: 'Invoice Number', value: 'INV-001' },
      { id: '2', label: 'Date', value: '2025-10-14' },
      { id: '3', label: 'Total Amount', value: '$150.00' },
    ],
  },
});
```

### 3. Use the Component

```typescript
<KeyValueFieldList
  control={control}
  fieldsName="fields"
  selectedTemplate={watch('selectedTemplate')}
  templates={templates}
  onTemplateChange={(template) => setValue('selectedTemplate', template)}
/>
```

### 4. Handle Form Submission

```typescript
const onSave = handleSubmit((data) => {
  console.log('Form data:', data);
  // Send data to API
  // await saveOcrData(data);
});

<Button type="primary" onClick={onSave}>
  Save
</Button>
```

## Features

### ✅ Automatic Form State Management
- No need for manual `useState` for fields
- React Hook Form handles all field operations (add, edit, delete, value changes)

### ✅ Built-in Validation
- Zod schema validates field data
- Validation errors display automatically
- Field labels and IDs are required by default

### ✅ Dynamic Field Array Management
- Uses `useFieldArray` internally
- Add/remove fields seamlessly
- Edit field labels on the fly

### ✅ Backward Compatible
- Still works with traditional callback props
- Existing implementations continue to work

## API Reference

### KeyValueFieldList Props

#### React Hook Form Mode (Recommended)

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `control` | `Control<TFieldValues>` | Yes* | React Hook Form control object |
| `fieldsName` | `'fields'` | No | Field name in the form (default: 'fields') |
| `selectedTemplate` | `string` | No | Currently selected template |
| `templates` | `Array<{value, label}>` | No | Available template options |
| `onTemplateChange` | `(template: string) => void` | No | Callback when template changes |

*Required when using React Hook Form mode

#### Traditional Mode (Legacy)

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `fields` | `Array<FieldData>` | Yes | Array of field data |
| `onAddField` | `(labelName: string) => void` | No | Callback when adding field |
| `onEditField` | `(id, label) => void` | No | Callback when editing field |
| `onDeleteField` | `(id) => void` | No | Callback when deleting field |
| `onFieldChange` | `(id, value) => void` | No | Callback when field value changes |

### LabeledInputField Props

#### React Hook Form Mode

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `control` | `Control<TFieldValues>` | Yes* | React Hook Form control object |
| `name` | `FieldPath<TFieldValues>` | Yes* | Field path in the form |
| `label` | `string` | Yes | Label text |
| `placeholder` | `string` | No | Placeholder text (default: '-') |
| `error` | `string` | No | Custom error message |
| `onEdit` | `() => void` | No | Callback for edit button |
| `onDelete` | `() => void` | No | Callback for delete button |

*Required when using React Hook Form mode

## Example Implementation

See `OcrDetailsPage.tsx` for a complete working example:

```typescript
// packages/web-platform/src/modules/ocr/pages/OcrDetailsPage.tsx

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  keyValueFieldListSchema,
  type KeyValueFieldListFormData,
} from '~shared/schemas';

export function OcrDetailsPage() {
  // Initialize form
  const { control, handleSubmit, watch, setValue } = useForm<KeyValueFieldListFormData>({
    resolver: zodResolver(keyValueFieldListSchema),
    defaultValues: {
      selectedTemplate: 'Template Bill Restaurant',
      fields: [
        { id: '1', label: 'Invoice Number', value: 'INV-001' },
        { id: '2', label: 'Date', value: '2025-10-14' },
        { id: '3', label: 'Total Amount', value: '$150.00' },
      ],
    },
  });

  // Handle save
  const handleSave = handleSubmit((data) => {
    console.log('Saving data:', data);
    // API call here
  });

  return (
    <DetailsRightPanel
      control={control}
      fields={watch('fields')}
      selectedTemplate={watch('selectedTemplate')}
      onTemplateChange={(template) => setValue('selectedTemplate', template)}
      onSave={handleSave}
    />
  );
}
```

## Benefits

1. **Type Safety**: Full TypeScript support with inferred types from Zod schema
2. **Less Boilerplate**: No need for manual state management and callbacks
3. **Validation**: Built-in validation with helpful error messages
4. **Performance**: React Hook Form optimizes re-renders
5. **Developer Experience**: Better debugging with React Hook Form DevTools

## Migration Guide

### Before (Traditional)

```typescript
const [fields, setFields] = useState<Array<FieldData>>([...]);

const handleAddField = (labelName: string) => {
  const newField = { id: Date.now().toString(), label: labelName, value: '' };
  setFields(prev => [...prev, newField]);
};

const handleEditField = (fieldId: string, newLabel: string) => {
  setFields(prev => prev.map(field =>
    field.id === fieldId ? { ...field, label: newLabel } : field
  ));
};

const handleDeleteField = (fieldId: string) => {
  setFields(prev => prev.filter(field => field.id !== fieldId));
};

const handleFieldChange = (fieldId: string, value: string) => {
  setFields(prev => prev.map(field =>
    field.id === fieldId ? { ...field, value } : field
  ));
};

<KeyValueFieldList
  fields={fields}
  onAddField={handleAddField}
  onEditField={handleEditField}
  onDeleteField={handleDeleteField}
  onFieldChange={handleFieldChange}
/>
```

### After (React Hook Form)

```typescript
const { control, handleSubmit, watch } = useForm<KeyValueFieldListFormData>({
  resolver: zodResolver(keyValueFieldListSchema),
  defaultValues: {
    fields: [...],
  },
});

const onSubmit = handleSubmit((data) => {
  // Handle form data
});

<KeyValueFieldList
  control={control}
  fieldsName="fields"
/>
```

## Troubleshooting

### TypeScript Errors

If you encounter TypeScript errors about generic types, ensure:
1. You're using the correct form data type: `KeyValueFieldListFormData`
2. The schema is properly imported from `~shared/schemas`
3. The `control` prop matches the form type

### Fields Not Updating

If fields don't update:
1. Ensure you're passing the `control` prop
2. Check that `fieldsName` matches your form structure (default: 'fields')
3. Use `watch('fields')` to debug form values

### Validation Not Working

If validation doesn't work:
1. Verify `zodResolver(keyValueFieldListSchema)` is passed to `useForm`
2. Check the schema allows the data format you're using
3. Use React Hook Form DevTools to inspect validation state

## Related Files

- Schema: `packages/web-platform/src/shared/schemas/key-value-field.schema.ts`
- Components:
  - `packages/web-platform/src/shared/components/KeyValueFieldList.tsx`
  - `packages/web-platform/src/shared/components/LabeledInputField.tsx`
- Example: `packages/web-platform/src/modules/ocr/pages/OcrDetailsPage.tsx`
