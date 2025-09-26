import type { SupportedLanguage, TranslationKey } from './types';

import { i18nConfig } from './config';

/**
 * Simple interpolation function to replace {{key}} with values
 */
export function interpolate(
  template: string,
  params: Record<string, string | number> = {}
): string {
  return template.replace(/\{\{(\w+)\}\}/g, (match, key) => {
    const value = params[key];
    return value !== undefined ? String(value) : match;
  });
}

/**
 * Get translation for a key in a specific language
 */
export function getTranslation(
  key: TranslationKey,
  language: SupportedLanguage,
  params?: Record<string, string | number>
): string {
  const translations = i18nConfig.resources[language];
  const template =
    translations?.[key] ||
    i18nConfig.resources[i18nConfig.fallbackLanguage][key] ||
    key;

  return params ? interpolate(template, params) : template;
}

/**
 * Detect user's preferred language from various sources
 */
export function detectLanguage(): SupportedLanguage {
  // Check localStorage first
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('ocr-platform-language');
    if (
      stored &&
      i18nConfig.supportedLanguages.includes(stored as SupportedLanguage)
    ) {
      return stored as SupportedLanguage;
    }
  }

  // Check browser language
  if (typeof navigator !== 'undefined') {
    const browserLang = navigator.language.split('-')[0] as SupportedLanguage;
    if (i18nConfig.supportedLanguages.includes(browserLang)) {
      return browserLang;
    }
  }

  return i18nConfig.defaultLanguage;
}

/**
 * Save language preference to localStorage
 */
export function saveLanguagePreference(language: SupportedLanguage): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('ocr-platform-language', language);
  }
}

/**
 * Format date according to language locale
 */
export function formatDateWithLocale(
  date: Date,
  language: SupportedLanguage,
  options: Intl.DateTimeFormatOptions = {}
): string {
  const localeMap: Record<SupportedLanguage, string> = {
    en: 'en-US',
    vi: 'vi-VN',
  };

  return new Intl.DateTimeFormat(localeMap[language], options).format(date);
}

/**
 * Format number according to language locale
 */
export function formatNumberWithLocale(
  number: number,
  language: SupportedLanguage,
  options: Intl.NumberFormatOptions = {}
): string {
  const localeMap: Record<SupportedLanguage, string> = {
    en: 'en-US',
    vi: 'vi-VN',
  };

  return new Intl.NumberFormat(localeMap[language], options).format(number);
}

/**
 * Get pluralized translation key based on count
 * Simple implementation - can be extended for more complex pluralization rules
 */
export function getPlural(
  singularKey: TranslationKey,
  count: number,
  language: SupportedLanguage = 'en'
): TranslationKey {
  // For now, simple plural logic (English-style)
  // This can be extended to support complex pluralization rules for different languages
  if (count === 1) {
    return singularKey;
  }

  // Try to find plural version by appending .plural
  const pluralKey = `${singularKey}.plural` as TranslationKey;
  const translations = i18nConfig.resources[language];

  if (translations && pluralKey in translations) {
    return pluralKey;
  }

  return singularKey; // fallback to singular
}
