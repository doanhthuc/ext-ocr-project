import { useNavigate } from '@tanstack/react-router';
import { Button } from 'antd';

import { IconDocScan, IconPdfScan, IconPictureScan } from '~/assets/icons';
import {
  TranslateDocumentCard,
  TranslateImportCard,
  TranslateProgressCard,
} from '~/translate/components';
import { useTranslation } from '~shared/hooks/useTranslation';

export function TranslatePage() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  // Mock data for progress documents
  const inProgressDocuments = [
    {
      id: '1',
      fileName: 'Job_Profile Document.pdf',
      lastModified: 'Jun 12.2025',
      progress: 40,
      isCompleted: false,
    },
    {
      id: '2',
      fileName: 'Job_Profile Document.pdf',
      lastModified: 'Jun 12.2025',
      progress: 40,
      isCompleted: false,
    },
    {
      id: '3',
      fileName: 'Job_Profile Document.pdf',
      lastModified: 'Jun 12.2025',
      progress: 50,
      isCompleted: false,
    },
    {
      id: '4',
      fileName: 'Job_Profile Document.pdf',
      lastModified: 'Jun 12.2025',
      progress: 40,
      isCompleted: false,
    },
    {
      id: '5',
      fileName: 'Job_Profile Document.pdf',
      lastModified: 'Jun 12.2025',
      progress: 50,
      isCompleted: false,
    },
    {
      id: '6',
      fileName: 'Job_Profile Document.pdf',
      lastModified: 'Jun 12.2025',
      progress: 100,
      isCompleted: true,
    },
  ];

  // Mock data for recent documents
  const recentDocuments = [
    {
      id: '7',
      fileName: 'Job_Profile Document.pdf',
      lastModified: 'Jun 12.2025',
    },
    {
      id: '8',
      fileName: 'Job_Profile Document.pdf',
      lastModified: 'Jun 12.2025',
    },
    {
      id: '9',
      fileName: 'Job_Profile Document.pdf',
      lastModified: 'Jun 12.2025',
    },
    {
      id: '10',
      fileName: 'Job_Profile Document.pdf',
      lastModified: 'Jun 12.2025',
    },
    {
      id: '11',
      fileName: 'Job_Profile Document.pdf',
      lastModified: 'Jun 12.2025',
    },
    {
      id: '12',
      fileName: 'Job_Profile Document.pdf',
      lastModified: 'Jun 12.2025',
    },
  ];

  const handleTranslatePicture = () => {
    navigate({ to: '/translate/import' });
  };

  const handleTranslatePdf = () => {
    console.log('Translate PDF clicked');
  };

  const handleTranslateDoc = () => {
    console.log('Translate Doc clicked');
  };

  const handleViewMoreRecent = () => {
    navigate({ to: '/translate/history' });
  };

  return (
    <div className="p-5 bg-[#f5f6ff] min-h-full">
      <h2 className="text-base font-semibold text-[#293056] mb-3">
        {t('translate.tools')}
      </h2>

      <div className="grid grid-cols-3 gap-4 mb-5">
        <TranslateImportCard
          icon={<IconPictureScan />}
          title={t('translate.translatePicture')}
          onClick={handleTranslatePicture}
        />

        <TranslateImportCard
          icon={<IconPdfScan />}
          title={t('translate.translatePdf')}
          onClick={handleTranslatePdf}
        />

        <TranslateImportCard
          icon={<IconDocScan />}
          title={t('translate.translateDoc')}
          onClick={handleTranslateDoc}
        />
      </div>

      <div className="mb-4">
        <div className="flex items-center justify-start gap-2.5 mb-3">
          <h3 className="text-base font-semibold text-[#293056]">
            {t('translate.progress')}
          </h3>
        </div>

        <div className="flex flex-col gap-3">
          <div className="grid grid-cols-3 gap-3">
            {inProgressDocuments.slice(0, 3).map(doc => (
              <TranslateProgressCard
                key={doc.id}
                fileName={doc.fileName}
                lastModified={doc.lastModified}
                progress={doc.progress}
                isCompleted={doc.isCompleted}
              />
            ))}
          </div>

          <div className="grid grid-cols-3 gap-3">
            {inProgressDocuments.slice(3, 6).map(doc => (
              <TranslateProgressCard
                key={doc.id}
                fileName={doc.fileName}
                lastModified={doc.lastModified}
                progress={doc.progress}
                isCompleted={doc.isCompleted}
              />
            ))}
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-start gap-2.5 mb-3">
          <h3 className="text-base font-semibold text-[#293056]">
            {t('translate.recentDocuments')}
          </h3>
          <Button
            type="link"
            className="text-sm font-semibold text-[#155eef] p-0 h-auto leading-5"
            onClick={handleViewMoreRecent}
          >
            {t('translate.viewMore')}
          </Button>
        </div>

        <div className="flex flex-col gap-3">
          <div className="grid grid-cols-3 gap-3">
            {recentDocuments.slice(0, 3).map(doc => (
              <TranslateDocumentCard
                key={doc.id}
                fileName={doc.fileName}
                lastModified={doc.lastModified}
              />
            ))}
          </div>

          <div className="grid grid-cols-3 gap-3">
            {recentDocuments.slice(3, 6).map(doc => (
              <TranslateDocumentCard
                key={doc.id}
                fileName={doc.fileName}
                lastModified={doc.lastModified}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
