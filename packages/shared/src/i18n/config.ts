import type { I18nConfig, SupportedLanguage } from './types';

import { en, vi } from './locales';

export const defaultLanguage: SupportedLanguage = 'en';
export const fallbackLanguage: SupportedLanguage = 'en';
export const supportedLanguages: Array<SupportedLanguage> = ['en', 'vi'];

export const i18nConfig: I18nConfig = {
  defaultLanguage,
  fallbackLanguage,
  supportedLanguages,
  resources: {
    en,
    vi,
  },
};

export const rtlLanguages: Array<SupportedLanguage> = [
  // Add RTL languages here if needed
  // 'ar', 'he', etc.
];

export function isRTL(language: SupportedLanguage): boolean {
  return rtlLanguages.includes(language);
}

export function getLanguageDisplayName(language: SupportedLanguage): string {
  const displayNames: Record<SupportedLanguage, string> = {
    en: 'English',
    vi: 'Tiếng Việt',
  };

  return displayNames[language] || language;
}
