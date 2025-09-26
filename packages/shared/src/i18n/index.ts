// Types
export type * from './types';

// Configuration
export { i18nConfig, defaultLanguage, supportedLanguages, isRTL, getLanguageDisplayName } from './config';

// Locales
export * from './locales';

// Utils
export {
  interpolate,
  getTranslation,
  detectLanguage,
  saveLanguagePreference,
  formatDateWithLocale,
  formatNumberWithLocale,
  getPlural,
} from './utils';