import { Link, useNavigate } from '@tanstack/react-router';
import { Breadcrumb } from 'antd';
import { useState } from 'react';

import type { FileType } from '~shared/components/FileItem';

import { TranslateLeftPanel } from '~/translate/components/TranslateLeftPanel';
import { TranslateRightPanel } from '~/translate/components/TranslateRightPanel';
import { useTranslateImportStore } from '~/translate/stores/translate-import.store';

type UploadedFile = {
  fileName: string;
  fileSize: string;
  fileType: FileType;
  id: string;
  progress?: number;
  status?: 'uploading' | 'uploaded' | 'completed' | 'idle';
  statusText?: string;
};

export function TranslateImportPage() {
  const navigate = useNavigate();
  const {
    sourceLanguage,
    targetLanguage,
    setSourceLanguage,
    setTargetLanguage,
  } = useTranslateImportStore();

  const [activeTab, setActiveTab] = useState('translate-file');
  const [files] = useState<Array<UploadedFile>>([
    {
      id: '1',
      fileName: 'document-01.jpg',
      fileSize: '12 MB',
      fileType: 'jpg',
      status: 'completed',
      statusText: 'Translation Completed',
    },
    {
      id: '2',
      fileName: 'contract.pdf',
      fileSize: '2.5 MB',
      fileType: 'pdf',
      status: 'uploading',
      statusText: 'Translation In Progress',
      progress: 65,
    },
    {
      id: '3',
      fileName: 'letter.png',
      fileSize: '8 MB',
      fileType: 'png',
      status: 'uploaded',
    },
  ]);
  const [selectedFiles, setSelectedFiles] = useState<Array<string>>([]);

  const handleFileCheckChange = (fileId: string) => (checked: boolean) => {
    setSelectedFiles(prev =>
      checked ? [...prev, fileId] : prev.filter(id => id !== fileId)
    );
  };

  const handleFileDetailsClick = (fileId: string) => {
    navigate({ to: '/translate/details/$id', params: { id: fileId } });
  };

  const handleSaveAsTemplate = () => {
    console.log('Save as template clicked');
  };

  const handleTranslateNow = () => {
    console.log('Translate Now clicked', { sourceLanguage, targetLanguage });
    // TODO: Implement translation logic
    // Example: await translateDocuments({ sourceLanguage, targetLanguage, files: selectedFiles })
  };

  return (
    <div className="p-6 bg-bg-tertiary h-full">
      {/* Breadcrumb */}
      <Breadcrumb
        className="mb-6"
        items={[
          {
            title: <Link to="/translate">Translate</Link>,
          },
          {
            title: 'Import',
          },
        ]}
      />

      <div className="grid grid-cols-[440px_1fr] gap-6 h-[calc(100vh-120px)]">
        {/* Left Panel */}
        <TranslateLeftPanel
          sourceLanguage={sourceLanguage}
          targetLanguage={targetLanguage}
          onSourceLanguageChange={setSourceLanguage}
          onTargetLanguageChange={setTargetLanguage}
          files={files}
          selectedFiles={selectedFiles}
          onFileCheckChange={handleFileCheckChange}
          onFileDetailsClick={handleFileDetailsClick}
          onTranslateNow={handleTranslateNow}
        />

        {/* Right Panel */}
        <TranslateRightPanel
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onSaveAsTemplate={handleSaveAsTemplate}
          onTranslateNow={handleTranslateNow}
        />
      </div>
    </div>
  );
}
