import { Link, useNavigate } from '@tanstack/react-router';
import { Breadcrumb } from 'antd';
import { useState } from 'react';

import {
  TranslateHistoryLeftPanel,
  TranslateHistoryRightPanel,
} from '~/translate/components';

type TranslateDocument = {
  fileName: string;
  id: string;
  lastModified: string;
  thumbnail?: string;
};

export function TranslateHistoryPage() {
  const navigate = useNavigate();
  const [_selectedDocumentId, setSelectedDocumentId] = useState<string | null>(
    null
  );

  // Mock data - replace with actual API call
  const [documents] = useState<Array<TranslateDocument>>([
    {
      id: '1',
      fileName: 'Document_Translation_001.pdf',
      lastModified: 'Jun 12, 2025',
      thumbnail:
        'http://localhost:3845/assets/3375c1be021c9b5015fbaafe78c0522a18247f94.png',
    },
    {
      id: '2',
      fileName: 'Manual_French_to_English.pdf',
      lastModified: 'Jun 11, 2025',
      thumbnail:
        'http://localhost:3845/assets/3375c1be021c9b5015fbaafe78c0522a18247f94.png',
    },
    {
      id: '3',
      fileName: 'Article_German_Translation.pdf',
      lastModified: 'Jun 10, 2025',
      thumbnail:
        'http://localhost:3845/assets/3375c1be021c9b5015fbaafe78c0522a18247f94.png',
    },
    {
      id: '4',
      fileName: 'Business_Email_Spanish.pdf',
      lastModified: 'Jun 9, 2025',
      thumbnail:
        'http://localhost:3845/assets/3375c1be021c9b5015fbaafe78c0522a18247f94.png',
    },
    {
      id: '5',
      fileName: 'Report_Portuguese_Version.pdf',
      lastModified: 'Jun 8, 2025',
      thumbnail:
        'http://localhost:3845/assets/3375c1be021c9b5015fbaafe78c0522a18247f94.png',
    },
    {
      id: '6',
      fileName: 'Legal_Document_Japanese.pdf',
      lastModified: 'Jun 7, 2025',
      thumbnail:
        'http://localhost:3845/assets/3375c1be021c9b5015fbaafe78c0522a18247f94.png',
    },
    {
      id: '7',
      fileName: 'Website_Content_Korean.pdf',
      lastModified: 'Jun 6, 2025',
      thumbnail:
        'http://localhost:3845/assets/3375c1be021c9b5015fbaafe78c0522a18247f94.png',
    },
    {
      id: '8',
      fileName: 'Certificate_Italian_Text.pdf',
      lastModified: 'Jun 5, 2025',
      thumbnail:
        'http://localhost:3845/assets/3375c1be021c9b5015fbaafe78c0522a18247f94.png',
    },
    {
      id: '9',
      fileName: 'Presentation_Arabic_Version.pdf',
      lastModified: 'Jun 4, 2025',
      thumbnail:
        'http://localhost:3845/assets/3375c1be021c9b5015fbaafe78c0522a18247f94.png',
    },
    {
      id: '10',
      fileName: 'Newsletter_Chinese_Simplified.pdf',
      lastModified: 'Jun 3, 2025',
      thumbnail:
        'http://localhost:3845/assets/3375c1be021c9b5015fbaafe78c0522a18247f94.png',
    },
    {
      id: '11',
      fileName: 'Contract_Thai_Translation.pdf',
      lastModified: 'Jun 2, 2025',
      thumbnail:
        'http://localhost:3845/assets/3375c1be021c9b5015fbaafe78c0522a18247f94.png',
    },
    {
      id: '12',
      fileName: 'Research_Paper_Vietnamese.pdf',
      lastModified: 'Jun 1, 2025',
      thumbnail:
        'http://localhost:3845/assets/3375c1be021c9b5015fbaafe78c0522a18247f94.png',
    },
  ]);

  const handleDocumentClick = (documentId: string) => {
    setSelectedDocumentId(documentId);
    navigate({ to: `/translate/history/${documentId}` });
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
            title: 'History',
          },
        ]}
      />

      <div className="grid grid-cols-[440px_1fr] gap-6 h-[calc(100vh-120px)]">
        {/* Left Panel */}
        <TranslateHistoryLeftPanel
          documents={documents}
          onDocumentClick={handleDocumentClick}
        />

        {/* Right Panel */}
        <TranslateHistoryRightPanel />
      </div>
    </div>
  );
}
