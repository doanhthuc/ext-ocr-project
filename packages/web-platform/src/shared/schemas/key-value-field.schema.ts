import { z } from 'zod';

/**
 * Schema for a single field in the KeyValueFieldList
 */
export const fieldSchema = z.object({
  /** Unique identifier for the field */
  id: z.string().min(1, 'Field ID is required'),
  /** Label for the field */
  label: z.string().min(1, 'Field label is required'),
  /** Value of the field */
  value: z.string(),
});

/**
 * Schema for the entire KeyValueFieldList form
 */
export const keyValueFieldListSchema = z.object({
  /** Selected template name */
  selectedTemplate: z.string().optional(),
  /** Array of fields */
  fields: z.array(fieldSchema),
});

/**
 * TypeScript types inferred from schemas
 */
export type FieldFormData = z.infer<typeof fieldSchema>;
export type KeyValueFieldListFormData = z.infer<typeof keyValueFieldListSchema>;
