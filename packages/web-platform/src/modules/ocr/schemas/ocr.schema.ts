/**
 * OCR Validation Schemas
 * Zod schemas for form validation
 */

import { z } from 'zod';

/**
 * Process Document Schema
 */
export const processDocumentSchema = z.object({
  filePath: z.string().min(1, 'File path is required'),
  target_language: z.string().optional(),
  fields_pairs: z.string().optional(),
});

export type ProcessDocumentFormData = z.infer<typeof processDocumentSchema>;
