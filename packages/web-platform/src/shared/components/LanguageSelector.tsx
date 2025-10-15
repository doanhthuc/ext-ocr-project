import type { SupportedLanguage } from '@ocr-platform/shared/i18n';

import {
  getLanguageDisplayName,
  supportedLanguages,
} from '@ocr-platform/shared/i18n';
import { Select } from 'antd';

import { useTranslation } from '~shared/hooks/useTranslation';

const { Option } = Select;

export function LanguageSelector() {
  const { currentLanguage, changeLanguage, t } = useTranslation();

  const handleLanguageChange = (language: SupportedLanguage) => {
    changeLanguage(language);
  };

  return (
    <Select
      value={currentLanguage}
      onChange={handleLanguageChange}
      style={{ minWidth: 120 }}
      placeholder={t('common.search')}
    >
      {supportedLanguages.map(language => (
        <Option key={language} value={language}>
          {getLanguageDisplayName(language)}
        </Option>
      ))}
    </Select>
  );
}
