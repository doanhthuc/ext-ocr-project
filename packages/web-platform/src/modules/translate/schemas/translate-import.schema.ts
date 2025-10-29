import { z } from 'zod';

export const translateImportSchema = z.object({
  sourceLanguage: z.string().min(1, 'Source language is required'),
  targetLanguage: z.string().min(1, 'Target language is required'),
  files: z.array(z.any()).min(1, 'At least one file is required'),
});

export type TranslateImportFormData = z.infer<typeof translateImportSchema>;
