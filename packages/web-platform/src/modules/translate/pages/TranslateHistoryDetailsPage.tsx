import { Link, useNavigate, useParams } from '@tanstack/react-router';
import { Breadcrumb, Empty } from 'antd';
import { useEffect } from 'react';

import { TranslateHistoryDetailsLeftPanel } from '~/translate/components/TranslateHistoryDetailsLeftPanel';
import { TranslateHistoryDetailsRightPanel } from '~/translate/components/TranslateHistoryDetailsRightPanel';
import { useTranslateDetailsStore } from '~/translate/stores/translate-details.store';
import { mockOcrDocuments } from '~shared/mock';

// Mock data mapping for translate documents
const documentDataMap: Record<
  string,
  {
    fileName: string;
  }
> = {
  '1': {
    fileName: 'Job_Profile Document.pdf',
  },
  '2': {
    fileName: 'Invoice_2025.pdf',
  },
  '3': {
    fileName: 'Contract_Agreement.pdf',
  },
  '4': {
    fileName: 'Receipt_Restaurant.pdf',
  },
  '5': {
    fileName: 'Bill_Electricity.pdf',
  },
};

export function TranslateHistoryDetailsPage() {
  const navigate = useNavigate();
  const { id } = useParams({ from: '/_private/translate/history/$id' });
  const { setOcrResults } = useTranslateDetailsStore();

  // Get document data based on ID
  const documentData = documentDataMap[id] || documentDataMap['1'];

  // Map history document ID to mock OCR document (cycle through available mock data)
  const mockDocumentIndex = (parseInt(id, 10) - 1) % mockOcrDocuments.length;
  const mockOcrDocument = mockOcrDocuments[mockDocumentIndex];
  const mockImage = mockOcrDocument.image;
  const mockOcrResultsForDoc = mockOcrDocument.ocrData;

  // Initialize OCR results in the store
  useEffect(() => {
    setOcrResults(mockOcrResultsForDoc);
  }, [setOcrResults, mockOcrResultsForDoc]);

  const handleBack = () => {
    navigate({ to: '/translate/history' });
  };

  const handleShare = () => {
    // TODO: Implement share functionality
    console.log('Share document:', id);
  };

  const handleExport = () => {
    // TODO: Implement export functionality
    console.log('Export document:', id);
  };

  // Show error if document not found
  if (!id) {
    return (
      <div className="p-6 bg-bg-tertiary h-full flex items-center justify-center">
        <Empty description="Document not found" />
      </div>
    );
  }

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
            title: <Link to="/translate/history">History</Link>,
          },
          {
            title: 'Details',
          },
        ]}
      />

      <div className="grid grid-cols-[440px_1fr] gap-6 h-[calc(100vh-120px)]">
        {/* Left Panel */}
        <TranslateHistoryDetailsLeftPanel
          fileName={documentData.fileName}
          image={mockImage}
          ocrData={mockOcrResultsForDoc.map(result => ({
            cells: result.cells,
            imageHeight: result.input_height,
            imageWidth: result.input_width,
          }))}
          onBack={handleBack}
          showBoundingBoxes={true}
        />

        {/* Right Panel */}
        <TranslateHistoryDetailsRightPanel
          ocrData={mockOcrResultsForDoc.map(result => ({
            cells: result.cells,
            imageHeight: result.input_height,
            imageWidth: result.input_width,
          }))}
          onShare={handleShare}
          onExport={handleExport}
          documentId={id}
        />
      </div>
    </div>
  );
}
