import { useNavigate } from '@tanstack/react-router';
import { Button } from 'antd';

import { IconFileScan, IconPictureScan } from '~/assets/icons';
import { OcrDocumentCard } from '~/ocr/components/OcrDocumentCard';
import { OcrImportCard } from '~/ocr/components/OcrImportCard';
import { OcrProgressCard } from '~/ocr/components/OcrProgressCard';
import { useTranslation } from '~shared/hooks/useTranslation';

export function OcrPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const inProgressDocuments = [
    {
      id: '1',
      fileName: 'Job_Profile Document.pdf',
      lastModified: 'Jun 12.2025',
      isLoading: true,
      progress: 40,
    },
    {
      id: '2',
      fileName: 'Job_Profile Document.pdf',
      lastModified: 'Jun 12.2025',
      isLoading: true,
      progress: 40,
    },
  ];

  const recentDocuments = [
    {
      id: '3',
      fileName: 'Job_Profile Document.pdf',
      lastModified: 'Jun 12.2025',
      isLoading: false,
    },
    {
      id: '4',
      fileName: 'Job_Profile Document.pdf',
      lastModified: 'Jun 12.2025',
      isLoading: false,
    },
  ];

  const handleImportPicture = () => {
    navigate({ to: '/ocr/import' });
  };

  const handleImportFile = () => {
    console.log('Import file clicked');
  };

  const handleViewMoreProgress = () => {
    console.log('View more progress clicked');
  };

  const handleViewMoreRecent = () => {
    navigate({ to: '/ocr/history' });
  };

  return (
    <div className="p-6 bg-bg-tertiary min-h-full">
      <h2 className="text-xl font-semibold text-text-secondary mb-5">
        {t('ocr.smartTools')}
      </h2>

      <div className="grid grid-cols-3 gap-8 mb-8">
        <OcrImportCard
          icon={<IconPictureScan />}
          title={t('ocr.importPicture')}
          onClick={handleImportPicture}
        />

        <OcrImportCard
          icon={<IconFileScan />}
          title={t('ocr.importFile')}
          onClick={handleImportFile}
        />
      </div>

      <div className="mb-8">
        <div className="flex items-center justify-start gap-4 mb-3">
          <h3 className="text-base font-medium text-text-secondary">
            {t('ocr.ocrProgress')}
          </h3>
          <Button
            type="link"
            className="text-xs font-medium text-primary-lighter p-0"
            onClick={handleViewMoreProgress}
          >
            {t('ocr.viewMore')}
          </Button>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {inProgressDocuments.map(doc => (
            <OcrProgressCard
              key={doc.id}
              fileName={doc.fileName}
              lastModified={doc.lastModified}
              progress={doc.progress || 0}
            />
          ))}

          {inProgressDocuments.map(doc => (
            <OcrProgressCard
              key={`copy-${doc.id}`}
              fileName={doc.fileName}
              lastModified={doc.lastModified}
              progress={doc.progress || 0}
            />
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-start gap-4 mb-3">
          <h3 className="text-base font-medium text-text-secondary">
            {t('ocr.recentDocuments')}
          </h3>
          <Button
            type="link"
            className="text-xs font-medium text-primary-lighter p-0"
            onClick={handleViewMoreRecent}
          >
            {t('ocr.viewMore')}
          </Button>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {recentDocuments.map(doc => (
            <OcrDocumentCard
              key={doc.id}
              fileName={doc.fileName}
              lastModified={doc.lastModified}
              isLoading={doc.isLoading}
            />
          ))}

          {recentDocuments.map(doc => (
            <OcrDocumentCard
              key={`copy-${doc.id}`}
              fileName={doc.fileName}
              lastModified={doc.lastModified}
              isLoading={doc.isLoading}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
