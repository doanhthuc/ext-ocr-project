import { Link, useNavigate } from '@tanstack/react-router';
import { Breadcrumb } from 'antd';
import { useState } from 'react';

import type { FileType } from '~shared/components/FileItem';

import { ImportLeftPanel } from '~/ocr/components/ImportLeftPanel';
import { ImportRightPanel } from '~/ocr/components/ImportRightPanel';

type UploadedFile = {
  fileName: string;
  fileSize: string;
  fileType: FileType;
  id: string;
  progress?: number;
  status?: 'uploading' | 'uploaded' | 'completed' | 'idle';
  statusText?: string;
};

export function ImportOcrPage() {
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState('key-value-pairs');
  const navigate = useNavigate();
  const [files] = useState<Array<UploadedFile>>([
    {
      id: '1',
      fileName: 'bill-01.jpg',
      fileSize: '12 MB',
      fileType: 'jpg',
      status: 'completed',
      statusText: 'OCR Completed',
    },
    {
      id: '2',
      fileName: 'invoice.pdf',
      fileSize: '2.5 MB',
      fileType: 'pdf',
      status: 'uploading',
      statusText: 'OCR Inprogress',
      progress: 65,
    },
    {
      id: '3',
      fileName: 'receipt.png',
      fileSize: '8 MB',
      fileType: 'png',
      status: 'uploaded',
    },
    {
      id: '4',
      fileName: 'contract.docx',
      fileSize: '1.2 MB',
      fileType: 'docx',
      status: 'uploading',
      statusText: 'OCR Inprogress',
      progress: 25,
    },
  ]);
  const [selectedFiles, setSelectedFiles] = useState<Array<string>>([]);

  const templates = [
    {
      id: 1,
      title: 'Template Bill Restaurant',
      lastModified: 'Last modified: Jun 12.2025',
    },
    {
      id: 2,
      title: 'Template Bill Restaurant',
      lastModified: 'Last modified: Jun 12.2025',
    },
    {
      id: 3,
      title: 'Template Bill Restaurant',
      lastModified: 'Last modified: Jun 12.2025',
    },
    {
      id: 4,
      title: 'Template Bill Restaurant',
      lastModified: 'Last modified: Jun 12.2025',
    },
  ];

  const handleTemplateChange = (index: number) => (checked: boolean) => {
    setSelectedTemplate(checked ? index : null);
  };

  const handleFileCheckChange = (fileId: string) => (checked: boolean) => {
    setSelectedFiles(prev =>
      checked ? [...prev, fileId] : prev.filter(id => id !== fileId)
    );
  };

  const handleFileRemove = (fileId: string) => {
    navigate({ to: '/ocr/details/$id', params: { id: fileId } });
  };

  const handleSaveAsTemplate = () => {
    console.log('Save as template clicked');
  };

  const handleOcrNow = () => {
    console.log('OCR Now clicked');
  };

  return (
    <div className="p-6 bg-bg-tertiary h-full">
      {/* Breadcrumb */}
      <Breadcrumb
        className="mb-6"
        items={[
          {
            title: <Link to="/ocr">OCR</Link>,
          },
          {
            title: 'Import Picture',
          },
        ]}
      />

      <div className="grid grid-cols-[440px_1fr] gap-6 h-[calc(100vh-120px)]">
        {/* Left Panel */}
        <ImportLeftPanel
          templates={templates}
          selectedTemplate={selectedTemplate}
          onTemplateChange={handleTemplateChange}
          files={files}
          selectedFiles={selectedFiles}
          onFileCheckChange={handleFileCheckChange}
          onFileDetailsClick={handleFileRemove}
          onOcrNow={handleOcrNow}
        />

        {/* Right Panel */}
        <ImportRightPanel
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onSaveAsTemplate={handleSaveAsTemplate}
          onOcrNow={handleOcrNow}
        />
      </div>
    </div>
  );
}
