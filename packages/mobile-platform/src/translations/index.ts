import type {
  SupportedLanguage,
  TranslationResources,
} from '@ocr-platform/shared/i18n';

import {
  defaultLanguage,
  fallbackLanguage,
  i18nConfig,
  supportedLanguages,
} from '@ocr-platform/shared/i18n';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = supportedLanguages.reduce<
  Record<
    SupportedLanguage,
    { translation: TranslationResources[SupportedLanguage] }
  >
>(
  (accumulator, language) => {
    accumulator[language] = { translation: i18nConfig.resources[language] };
    return accumulator;
  },
  {} as Record<
    SupportedLanguage,
    { translation: TranslationResources[SupportedLanguage] }
  >
);

void i18n.use(initReactI18next).init({
  compatibilityJSON: 'v4',
  defaultNS: 'translation',
  fallbackLng: fallbackLanguage,
  interpolation: {
    escapeValue: false,
  },
  lng: defaultLanguage,
  ns: ['translation'],
  resources,
  supportedLngs: supportedLanguages,
});

i18n.services.formatter?.add('capitalize', value => {
  return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
});

export type { SupportedLanguage };
export { supportedLanguages };

export default i18n;
