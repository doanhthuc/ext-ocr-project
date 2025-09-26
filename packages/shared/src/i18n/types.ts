import type { en } from './locales/en';

export type SupportedLanguage = 'en' | 'vi';

// Dynamically generate TranslationKey type from the actual English translations
export type TranslationKey = keyof typeof en;

export type TranslationResources = Record<
  SupportedLanguage,
  Record<TranslationKey, string>
>;

export type I18nConfig = {
  defaultLanguage: SupportedLanguage;
  supportedLanguages: Array<SupportedLanguage>;
  fallbackLanguage: SupportedLanguage;
  resources: TranslationResources;
};

export type UseTranslationReturn = {
  t: (key: TranslationKey, params?: Record<string, string | number>) => string;
  currentLanguage: SupportedLanguage;
  changeLanguage: (language: SupportedLanguage) => void | Promise<void>;
  isRTL: boolean;
};
