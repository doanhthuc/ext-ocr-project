import {
  supportedLanguages,
  type SupportedLanguage,
} from '@ocr-platform/shared/i18n';
import { z } from 'zod';

const languageValues = supportedLanguages as [
  SupportedLanguage,
  ...Array<SupportedLanguage>,
];

export const languageSchema = z.enum(languageValues);

export type Language = z.infer<typeof languageSchema>;

export { supportedLanguages };
export type { SupportedLanguage };
