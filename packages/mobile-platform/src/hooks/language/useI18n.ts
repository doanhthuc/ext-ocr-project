import { storage } from '@/App';
import i18n from '@/translations';
import { defaultLanguage } from '@ocr-platform/shared/i18n';

import {
  languageSchema,
  supportedLanguages,
  type SupportedLanguage,
} from './schema';

export const LANGUAGE_STORAGE_KEY = 'ocr-platform.language';

const isSupportedLanguage = (value: unknown): value is SupportedLanguage => {
  return languageSchema.safeParse(value).success;
};

const readStoredLanguage = (): SupportedLanguage | undefined => {
  const stored = storage.getString(LANGUAGE_STORAGE_KEY);
  if (stored && isSupportedLanguage(stored)) {
    return stored;
  }
  return undefined;
};

const persistLanguage = (language: SupportedLanguage) => {
  storage.set(LANGUAGE_STORAGE_KEY, language);
};

const initializeLanguage = () => {
  const stored = readStoredLanguage();
  const initialLanguage =
    stored ??
    (i18n.language as SupportedLanguage | undefined) ??
    defaultLanguage;

  if (stored === undefined) {
    persistLanguage(initialLanguage);
  }

  if (i18n.language !== initialLanguage) {
    void i18n.changeLanguage(initialLanguage);
  }
};

initializeLanguage();

const changeLanguage = (language: SupportedLanguage) => {
  if (!supportedLanguages.includes(language)) {
    return;
  }

  persistLanguage(language);
  void i18n.changeLanguage(language);
};

const toggleLanguage = () => {
  const current =
    (i18n.language as SupportedLanguage | undefined) ?? defaultLanguage;
  const currentIndex = supportedLanguages.indexOf(current);
  const nextLanguage =
    supportedLanguages[(currentIndex + 1) % supportedLanguages.length];

  changeLanguage(nextLanguage);
};

export const useI18n = () => {
  return {
    changeLanguage,
    currentLanguage:
      (i18n.language as SupportedLanguage | undefined) ?? defaultLanguage,
    toggleLanguage,
  };
};
