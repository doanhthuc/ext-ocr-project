import { CaretLeft } from '@phosphor-icons/react';
import { useNavigate } from '@tanstack/react-router';
import { Button } from 'antd';

import IMAGE_NOT_FOUND from '~/assets/images/404.png';
import { useTranslation } from '~shared/hooks/useTranslation';

export function NotFound() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="grid grid-cols-2 min-h-screen">
      <div className="flex justify-center items-center flex-col relative">
        <Button
          className="absolute top-4 left-4 text-xl items-center"
          type="text"
          onClick={() => navigate({ to: '/' })}
        >
          <CaretLeft size={20} />
          {t('common.back')}
        </Button>

        <h1 className="text-5xl font-semibold mb-6">{t('notFound.title')}</h1>
        <img width={200} height={150} src={IMAGE_NOT_FOUND} className="mb-6" />
        <div className="text-xl">{t('notFound.subtitle')}</div>
        <div className="text-xl">{t('notFound.description')}</div>
      </div>
    </div>
  );
}
