import { Select } from 'antd';
import { useState } from 'react';

import { IconArrowRight02Sharp, IconCopy } from '~icons';

type TranslateByTextProps = {
  defaultFromLanguage?: string;
  defaultToLanguage?: string;
};

type TranslationItem = {
  id: string;
  text: string;
};

export function TranslateByText({
  defaultFromLanguage = 'vi',
  defaultToLanguage = 'en',
}: TranslateByTextProps) {
  const [fromLanguage, setFromLanguage] = useState(defaultFromLanguage);
  const [toLanguage, setToLanguage] = useState(defaultToLanguage);
  const [translations, _setTranslations] = useState<Array<TranslationItem>>([
    { id: '1', text: 'VIP-06-VIP' },
    { id: '2', text: 'VIP-06-VIP' },
    { id: '3', text: 'VIP-06-VIP' },
    { id: '4', text: 'VIP-06-VIP' },
    { id: '5', text: 'VIP-06-VIP' },
    { id: '6', text: 'VIP-06-VIP' },
  ]);

  const languageOptions = [
    { value: 'vi', label: 'Vietnamese' },
    { value: 'en', label: 'English' },
    { value: 'zh', label: 'Chinese' },
    { value: 'ja', label: 'Japanese' },
    { value: 'ko', label: 'Korean' },
    { value: 'fr', label: 'French' },
    { value: 'de', label: 'German' },
    { value: 'es', label: 'Spanish' },
  ];

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Language Selection */}
      <div className="flex items-center gap-3 pb-4 shrink-0">
        <Select
          value={fromLanguage}
          onChange={setFromLanguage}
          options={languageOptions}
          className="flex-1"
          size="large"
        />
        <IconArrowRight02Sharp className="size-6 text-text-tertiary shrink-0" />
        <Select
          value={toLanguage}
          onChange={setToLanguage}
          options={languageOptions}
          className="flex-1"
          size="large"
        />
      </div>

      {/* Translation List */}
      <div className="flex-1 flex flex-col gap-4 overflow-auto">
        {translations.map(item => (
          <div
            key={item.id}
            className="bg-white border border-gray-12 rounded-xl p-4 flex items-center justify-between gap-3"
          >
            <span className="text-text-dark text-base font-archivo">
              {item.text}
            </span>
            <button
              onClick={() => handleCopy(item.text)}
              className="text-blue-4 hover:text-blue-5 transition-colors shrink-0"
              aria-label="Copy text"
            >
              <IconCopy className="size-5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
