import { Link, useNavigate, useParams } from '@tanstack/react-router';
import { Breadcrumb, Empty } from 'antd';
import { useEffect } from 'react';

import { HistoryDetailsLeftPanel } from '~/ocr/components/HistoryDetailsLeftPanel';
import { HistoryDetailsRightPanel } from '~/ocr/components/HistoryDetailsRightPanel';
import { useOcrDetailsStore } from '~/ocr/stores/ocr-details.store';
import { mockOcrDocuments } from '~shared/mock';

// Mock data mapping for documents
const documentDataMap: Record<
  string,
  {
    fileName: string;
    fields: Array<{
      id: string;
      label: string;
      value: string;
    }>;
  }
> = {
  '1': {
    fileName: 'Job_Profile Document.pdf',
    fields: [
      { id: '1', label: 'Full Name', value: 'John Smith' },
      { id: '2', label: 'Position', value: 'Senior Developer' },
      { id: '3', label: 'Department', value: 'Engineering' },
      { id: '4', label: 'Start Date', value: '2020-01-15' },
      { id: '5', label: 'Status', value: 'Active' },
    ],
  },
  '2': {
    fileName: 'Invoice_2025.pdf',
    fields: [
      { id: '1', label: 'Invoice Number', value: 'INV-2025-001' },
      { id: '2', label: 'Date', value: '2025-10-14' },
      { id: '3', label: 'Total Amount', value: '$1,250.00' },
      { id: '4', label: 'Customer Name', value: 'Acme Corp' },
      { id: '5', label: 'Status', value: 'Paid' },
    ],
  },
  '3': {
    fileName: 'Contract_Agreement.pdf',
    fields: [
      { id: '1', label: 'Party A', value: 'Company A Inc.' },
      { id: '2', label: 'Party B', value: 'Company B Ltd.' },
      { id: '3', label: 'Effective Date', value: '2025-01-01' },
      { id: '4', label: 'Termination Date', value: '2026-01-01' },
      { id: '5', label: 'Jurisdiction', value: 'New York' },
    ],
  },
  '4': {
    fileName: 'Receipt_Restaurant.pdf',
    fields: [
      { id: '1', label: 'Restaurant Name', value: 'The Golden Fork' },
      { id: '2', label: 'Date', value: '2025-06-09' },
      { id: '3', label: 'Total Amount', value: '$85.50' },
      { id: '4', label: 'Payment Method', value: 'Credit Card' },
      { id: '5', label: 'Items Count', value: '4' },
    ],
  },
  '5': {
    fileName: 'Bill_Electricity.pdf',
    fields: [
      { id: '1', label: 'Account Number', value: 'AC-2025-8765' },
      { id: '2', label: 'Billing Period', value: 'Jun 2025' },
      { id: '3', label: 'Amount Due', value: '$245.78' },
      { id: '4', label: 'Due Date', value: '2025-07-08' },
      { id: '5', label: 'Status', value: 'Paid' },
    ],
  },
};

export function OcrHistoryDetailsPage() {
  const navigate = useNavigate();
  const { id } = useParams({ from: '/_private/ocr/history/$id' });
  const { setOcrResults } = useOcrDetailsStore();

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
    navigate({ to: '/ocr/history' });
  };

  const handleEdit = () => {
    navigate({ to: '/ocr/edit/$id', params: { id } });
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
            title: <Link to="/ocr">OCR</Link>,
          },
          {
            title: <Link to="/ocr/history">History</Link>,
          },
          {
            title: 'Details',
          },
        ]}
      />

      <div className="grid grid-cols-[440px_1fr] gap-6 h-[calc(100vh-120px)]">
        {/* Left Panel */}
        <HistoryDetailsLeftPanel
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
        <HistoryDetailsRightPanel
          fields={documentData.fields}
          onEdit={handleEdit}
          onShare={handleShare}
          onExport={handleExport}
        />
      </div>
    </div>
  );
}
