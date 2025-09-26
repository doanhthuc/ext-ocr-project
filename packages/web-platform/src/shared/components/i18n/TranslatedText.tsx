import type { TranslationKey } from '@ocr-platform/shared/i18n';

import { useTranslation } from '~shared/hooks/useTranslation';

type Props = {
  i18nKey: TranslationKey;
  params?: Record<string, string | number>;
  fallback?: string;
  className?: string;
  style?: React.CSSProperties;
};

export function TranslatedText({
  i18nKey,
  params,
  fallback,
  className,
  style,
}: Props) {
  const { t } = useTranslation();

  const translatedText = t(i18nKey, params);

  return (
    <span className={className} style={style}>
      {translatedText || fallback || i18nKey}
    </span>
  );
}
