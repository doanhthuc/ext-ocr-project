import type { SupportedLanguage } from '@ocr-platform/shared/i18n';

import {
  getLanguageDisplayName,
  supportedLanguages,
} from '@ocr-platform/shared/i18n';
import { ArrowsClockwise } from '@phosphor-icons/react';

import { useTranslation } from '~shared/hooks/useTranslation';
import { cn } from '~shared/utils/cn.util';

type LanguageSwitcherProps = {
  className?: string;
};

export function LanguageSwitcher({ className }: LanguageSwitcherProps) {
  const { currentLanguage, changeLanguage } = useTranslation();

  // Get the opposite language (assuming we have only 2 languages)
  const getOppositeLanguage = (lang: SupportedLanguage): SupportedLanguage => {
    const index = supportedLanguages.indexOf(lang);
    const oppositeIndex = (index + 1) % supportedLanguages.length;
    return supportedLanguages[oppositeIndex];
  };

  const oppositeLanguage = getOppositeLanguage(currentLanguage);

  const handleSwitchLanguage = () => {
    changeLanguage(oppositeLanguage);
  };

  return (
    <div
      className={cn(
        'relative flex items-center justify-between h-12 rounded-[30px] bg-blue-50 border border-blue-500 px-6',
        className
      )}
    >
      {/* Left side - Current Language */}
      <div className="flex items-center gap-1">
        <span className="text-blue-500 font-medium text-base">
          {getLanguageDisplayName(currentLanguage)}
        </span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3.33301 5.33337L7.99967 10.0001L12.6663 5.33337"
            stroke="#2970FF"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Center - Switch Button */}
      <button
        onClick={handleSwitchLanguage}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center w-12 h-12 rounded-full bg-blue-600 shadow-[2px_10px_17px_0px_rgba(0,0,0,0.35)] hover:bg-blue-700 transition-colors"
        aria-label="Switch language"
      >
        <ArrowsClockwise size={20} weight="fill" className="text-white" />
      </button>

      {/* Right side - Target Language */}
      <div className="flex items-center gap-1">
        <span className="text-blue-500 font-medium text-base">
          {getLanguageDisplayName(oppositeLanguage)}
        </span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3.33301 5.33337L7.99967 10.0001L12.6663 5.33337"
            stroke="#2970FF"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}
