import type {
  SupportedLanguage,
  TranslationKey,
  UseTranslationReturn,
} from '@ocr-platform/shared/i18n';

import {
  detectLanguage,
  getTranslation,
  isRTL,
  saveLanguagePreference,
  supportedLanguages,
} from '@ocr-platform/shared/i18n';
import { useCallback, useEffect, useState } from 'react';

// Global state for language (simple implementation)
let globalLanguage: SupportedLanguage = detectLanguage();
const subscribers = new Set<() => void>();

function notifySubscribers() {
  subscribers.forEach(callback => callback());
}

export function useTranslation(): UseTranslationReturn {
  const [currentLanguage, setCurrentLanguage] =
    useState<SupportedLanguage>(globalLanguage);

  useEffect(() => {
    const unsubscribe = () => {
      setCurrentLanguage(globalLanguage);
    };

    subscribers.add(unsubscribe);

    return () => {
      subscribers.delete(unsubscribe);
    };
  }, []);

  const t = useCallback(
    (key: TranslationKey, params?: Record<string, string | number>) => {
      return getTranslation(key, currentLanguage, params);
    },
    [currentLanguage]
  );

  const changeLanguage = useCallback((language: SupportedLanguage) => {
    if (!supportedLanguages.includes(language)) {
      console.warn(`Language "${language}" is not supported`);
      return;
    }

    globalLanguage = language;
    saveLanguagePreference(language);
    notifySubscribers();

    // Update document language for accessibility
    if (typeof document !== 'undefined') {
      document.documentElement.lang = language;
      document.documentElement.dir = isRTL(language) ? 'rtl' : 'ltr';
    }
  }, []);

  return {
    t,
    currentLanguage,
    changeLanguage,
    isRTL: isRTL(currentLanguage),
  };
}
