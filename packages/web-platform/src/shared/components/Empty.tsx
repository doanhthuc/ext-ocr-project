import { Empty as AntEmpty, EmptyProps } from 'antd';

import { useTranslation } from '~shared/hooks/useTranslation';

export function Empty(props: EmptyProps) {
  const { t } = useTranslation();

  return (
    <AntEmpty
      image={AntEmpty.PRESENTED_IMAGE_SIMPLE}
      description={props.description || t('status.noData')}
      {...props}
    />
  );
}
