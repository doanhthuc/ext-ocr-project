import { Link, useNavigate, useParams } from '@tanstack/react-router';
import { Breadcrumb } from 'antd';
import { useEffect } from 'react';

import { TranslateEditLeftPanel } from '~/translate/components/TranslateEditLeftPanel';
import { TranslateEditRightPanel } from '~/translate/components/TranslateEditRightPanel';
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

export function TranslateEditPage() {
  const navigate = useNavigate();
  const { id } = useParams({ from: '/_private/translate/edit/$id' });
  const { setOcrResults } = useTranslateDetailsStore();

  // Get document data based on ID
  const documentData = documentDataMap[id] || documentDataMap['1'];

  // Map document ID to mock OCR document
  const mockDocumentIndex = (parseInt(id, 10) - 1) % mockOcrDocuments.length;
  const mockOcrDocument = mockOcrDocuments[mockDocumentIndex];
  const mockImage = mockOcrDocument.image;
  const mockOcrResultsForDoc = mockOcrDocument.ocrData;

  // Initialize OCR results in the store
  useEffect(() => {
    setOcrResults(mockOcrResultsForDoc);
  }, [setOcrResults, mockOcrResultsForDoc]);

  const handleBack = () => {
    navigate({ to: '/translate/history/$id', params: { id } });
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
            title: <Link to="/translate/history">History</Link>,
          },
          {
            title: 'Edit',
          },
        ]}
      />

      <div className="grid grid-cols-[440px_1fr] gap-6 h-[calc(100vh-120px)]">
        {/* Left Panel */}
        <TranslateEditLeftPanel
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
        <TranslateEditRightPanel
          ocrData={mockOcrResultsForDoc.map(result => ({
            cells: result.cells,
            imageHeight: result.input_height,
            imageWidth: result.input_width,
          }))}
        />
      </div>
    </div>
  );
}
