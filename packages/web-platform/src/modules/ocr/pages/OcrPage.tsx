import { Button } from 'antd';
// import { useState } from "react";

import { IconPicture, IconFolder, IconSquareSticker } from '~/assets/icons';
import { OcrDocumentCard } from '~/ocr/components/OcrDocumentCard';
import { OcrImportCard } from '~/ocr/components/OcrImportCard';
import { OcrProgressCard } from '~/ocr/components/OcrProgressCard';

export function OcrPage() {
  // Uncomment when needed for tab functionality
  // const [activeTab, setActiveTab] = useState<"ocr" | "translate" | "dashboard">("ocr");

  // Sample data - in a real app, this would come from an API
  const inProgressDocuments = [
    {
      id: '1',
      fileName: 'Job_Profile Document.pdf',
      lastModified: 'Jun 12.2025',
      convertTo: 'Docx' as const,
      isLoading: true,
      progress: 40,
    },
    {
      id: '2',
      fileName: 'Job_Profile Document.pdf',
      lastModified: 'Jun 12.2025',
      convertTo: 'Excel' as const,
      isLoading: true,
      progress: 40,
    },
  ];

  const recentDocuments = [
    {
      id: '3',
      fileName: 'Job_Profile Document.pdf',
      lastModified: 'Jun 12.2025',
      convertTo: 'Docx' as const,
      isLoading: false,
      sheetCount: 24,
    },
    {
      id: '4',
      fileName: 'Job_Profile Document.pdf',
      lastModified: 'Jun 12.2025',
      convertTo: 'Excel' as const,
      isLoading: false,
      sheetCount: 24,
    },
  ];

  const handleImportPicture = () => {
    console.log('Import picture clicked');
  };

  const handleImportFile = () => {
    console.log('Import file clicked');
  };

  const handleUseTemplate = () => {
    console.log('Use template clicked');
  };

  const handleMoreClick = (id: string) => {
    console.log('More clicked for document', id);
  };

  const handleViewMoreProgress = () => {
    console.log('View more progress clicked');
  };

  const handleViewMoreRecent = () => {
    console.log('View more recent clicked');
  };

  return (
    <div className="p-6 bg-bg-tertiary min-h-full">
      {/* Smart OCR Tools */}
      <h2 className="text-xl font-semibold text-text-secondary mb-5">
        Smart OCR Tools
      </h2>

      {/* Import Cards */}
      <div className="flex gap-8 mb-8">
        <OcrImportCard
          icon={
            <div className="w-10 h-10 rounded-full bg-bg-success flex items-center justify-center">
              <IconPicture className="w-7 h-7 text-success-lightest" />
            </div>
          }
          title="Import Picture"
          onClick={handleImportPicture}
        />

        <OcrImportCard
          icon={
            <div className="w-10 h-10 rounded-full bg-bg-warning flex items-center justify-center">
              <IconFolder className="w-7 h-7 text-status-amber" />
            </div>
          }
          title="Import File"
          onClick={handleImportFile}
        />

        <OcrImportCard
          icon={
            <div className="w-10 h-10 rounded-full bg-bg-purple flex items-center justify-center">
              <IconSquareSticker className="w-7 h-7 text-status-violet" />
            </div>
          }
          title="Use Template"
          onClick={handleUseTemplate}
        />
      </div>

      {/* OCR Progress */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-base font-medium text-text-secondary">
            OCR Progress
          </h3>
          <Button
            type="link"
            className="text-xs font-medium text-primary-lighter p-0"
            onClick={handleViewMoreProgress}
          >
            View More
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {inProgressDocuments.map(doc => (
            <OcrProgressCard
              key={doc.id}
              fileName={doc.fileName}
              lastModified={doc.lastModified}
              convertTo={doc.convertTo}
              progress={doc.progress || 0}
            />
          ))}
        </div>

        <div className="grid grid-cols-2 gap-6 mt-3">
          {inProgressDocuments.map(doc => (
            <OcrProgressCard
              key={`copy-${doc.id}`}
              fileName={doc.fileName}
              lastModified={doc.lastModified}
              convertTo={doc.convertTo}
              progress={doc.progress || 0}
            />
          ))}
        </div>
      </div>

      {/* Recent Documents */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-base font-medium text-text-secondary">
            Recent Document
          </h3>
          <Button
            type="link"
            className="text-xs font-medium text-primary-lighter p-0"
            onClick={handleViewMoreRecent}
          >
            View More
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {recentDocuments.map(doc => (
            <OcrDocumentCard
              key={doc.id}
              fileName={doc.fileName}
              lastModified={doc.lastModified}
              convertTo={doc.convertTo}
              isLoading={doc.isLoading}
              sheetCount={doc.sheetCount}
              onMoreClick={() => handleMoreClick(doc.id)}
            />
          ))}
        </div>

        <div className="grid grid-cols-2 gap-6 mt-3">
          {recentDocuments.map(doc => (
            <OcrDocumentCard
              key={`copy-${doc.id}`}
              fileName={doc.fileName}
              lastModified={doc.lastModified}
              convertTo={doc.convertTo}
              isLoading={doc.isLoading}
              sheetCount={doc.sheetCount}
              onMoreClick={() => handleMoreClick(doc.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
