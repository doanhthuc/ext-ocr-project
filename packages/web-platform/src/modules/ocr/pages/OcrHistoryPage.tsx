import { Link, useNavigate } from '@tanstack/react-router';
import { Breadcrumb } from 'antd';
import { useState } from 'react';

import { OcrHistoryLeftPanel } from '~/ocr/components/OcrHistoryLeftPanel';
import { OcrHistoryRightPanel } from '~/ocr/components/OcrHistoryRightPanel';

type OcrDocument = {
  fileName: string;
  id: string;
  lastModified: string;
  thumbnail?: string;
};

export function OcrHistoryPage() {
  const navigate = useNavigate();
  const [_selectedDocumentId, setSelectedDocumentId] = useState<string | null>(
    null
  );

  // Mock data - replace with actual API call
  const [documents] = useState<Array<OcrDocument>>([
    {
      id: '1',
      fileName: 'Job_Profile Document.pdf',
      lastModified: 'Jun 12, 2025',
      thumbnail:
        'http://localhost:3845/assets/3375c1be021c9b5015fbaafe78c0522a18247f94.png',
    },
    {
      id: '2',
      fileName: 'Invoice_2025.pdf',
      lastModified: 'Jun 11, 2025',
      thumbnail:
        'http://localhost:3845/assets/3375c1be021c9b5015fbaafe78c0522a18247f94.png',
    },
    {
      id: '3',
      fileName: 'Contract_Agreement.pdf',
      lastModified: 'Jun 10, 2025',
      thumbnail:
        'http://localhost:3845/assets/3375c1be021c9b5015fbaafe78c0522a18247f94.png',
    },
    {
      id: '4',
      fileName: 'Receipt_Restaurant.pdf',
      lastModified: 'Jun 9, 2025',
      thumbnail:
        'http://localhost:3845/assets/3375c1be021c9b5015fbaafe78c0522a18247f94.png',
    },
    {
      id: '5',
      fileName: 'Bill_Electricity.pdf',
      lastModified: 'Jun 8, 2025',
      thumbnail:
        'http://localhost:3845/assets/3375c1be021c9b5015fbaafe78c0522a18247f94.png',
    },
    {
      id: '6',
      fileName: 'Passport_Scan.pdf',
      lastModified: 'Jun 7, 2025',
      thumbnail:
        'http://localhost:3845/assets/3375c1be021c9b5015fbaafe78c0522a18247f94.png',
    },
    {
      id: '7',
      fileName: 'Insurance_Document.pdf',
      lastModified: 'Jun 6, 2025',
      thumbnail:
        'http://localhost:3845/assets/3375c1be021c9b5015fbaafe78c0522a18247f94.png',
    },
    {
      id: '8',
      fileName: 'Medical_Report.pdf',
      lastModified: 'Jun 5, 2025',
      thumbnail:
        'http://localhost:3845/assets/3375c1be021c9b5015fbaafe78c0522a18247f94.png',
    },
    {
      id: '9',
      fileName: 'Tax_Return_2024.pdf',
      lastModified: 'Jun 4, 2025',
      thumbnail:
        'http://localhost:3845/assets/3375c1be021c9b5015fbaafe78c0522a18247f94.png',
    },
    {
      id: '10',
      fileName: 'Utility_Bill.pdf',
      lastModified: 'Jun 3, 2025',
      thumbnail:
        'http://localhost:3845/assets/3375c1be021c9b5015fbaafe78c0522a18247f94.png',
    },
    {
      id: '11',
      fileName: 'Lease_Agreement.pdf',
      lastModified: 'Jun 2, 2025',
      thumbnail:
        'http://localhost:3845/assets/3375c1be021c9b5015fbaafe78c0522a18247f94.png',
    },
    {
      id: '12',
      fileName: 'Purchase_Order.pdf',
      lastModified: 'Jun 1, 2025',
      thumbnail:
        'http://localhost:3845/assets/3375c1be021c9b5015fbaafe78c0522a18247f94.png',
    },
  ]);

  const handleDocumentClick = (documentId: string) => {
    setSelectedDocumentId(documentId);
    navigate({ to: `/ocr/history/${documentId}` });
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
            title: 'History',
          },
        ]}
      />

      <div className="grid grid-cols-[440px_1fr] gap-6 h-[calc(100vh-120px)]">
        {/* Left Panel */}
        <OcrHistoryLeftPanel
          documents={documents}
          onDocumentClick={handleDocumentClick}
        />

        {/* Right Panel */}
        <OcrHistoryRightPanel />
      </div>
    </div>
  );
}
