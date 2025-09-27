/* eslint-disable @typescript-eslint/consistent-type-definitions */
import type {
  SupportedLanguage,
  TranslationResources,
} from '@ocr-platform/shared/i18n';

import 'react-i18next';

declare module 'react-i18next' {
  interface CustomTypeOptions {
    defaultNS: 'translation';
    resources: {
      translation: TranslationResources[SupportedLanguage];
    };
  }
}
