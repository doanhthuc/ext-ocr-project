import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from '@tanstack/react-router';
import { Breadcrumb } from 'antd';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { DetailsLeftPanel } from '~/ocr/components/DetailsLeftPanel';
import { DetailsRightPanel } from '~/ocr/components/DetailsRightPanel';
import { useOcrDetailsStore } from '~/ocr/stores/ocr-details.store';
import { mockOcrResults } from '~shared/mock';
import {
  keyValueFieldListSchema,
  type KeyValueFieldListFormData,
} from '~shared/schemas';

export function OcrDetailsPage() {
  const navigate = useNavigate();
  const { setOcrResults } = useOcrDetailsStore();

  // Initialize OCR results in the store
  useEffect(() => {
    setOcrResults(mockOcrResults);
  }, [setOcrResults]);

  // Initialize React Hook Form with Zod validation
  const { control, handleSubmit, watch, setValue } =
    useForm<KeyValueFieldListFormData>({
      resolver: zodResolver(keyValueFieldListSchema),
      defaultValues: {
        selectedTemplate: 'Template Bill Restaurant',
        fields: [
          {
            id: '1',
            label: 'Invoice Number',
            value: 'INV-001',
          },
          {
            id: '2',
            label: 'Date',
            value: '2025-10-14',
          },
          {
            id: '3',
            label: 'Total Amount',
            value: '$150.00',
          },
        ],
      },
    });

  // Watch form values
  const selectedTemplate = watch('selectedTemplate');
  const fields = watch('fields');

  const templates = [
    { value: 'Template Bill Restaurant', label: 'Template Bill Restaurant' },
    { value: 'Template Invoice', label: 'Template Invoice' },
    { value: 'Template Receipt', label: 'Template Receipt' },
  ];

  const handleTemplateChange = (template: string) => {
    setValue('selectedTemplate', template);
  };

  const handleSave = handleSubmit(data => {
    console.log('Form data:', data);
    // TODO: Send data to API
    // Example: await saveOcrData(data);
  });

  const handleBack = () => {
    navigate({ to: '/ocr/import' });
  };

  return (
    <div className="p-6 bg-bg-tertiary h-full">
      {/* Breadcrumb */}
      <Breadcrumb
        className="mb-6"
        items={[
          {
            title: 'OCR',
          },
          {
            title: 'Details',
          },
        ]}
      />

      <div className="grid grid-cols-[440px_1fr] gap-6 h-[calc(100vh-120px)]">
        {/* Left Panel */}
        <DetailsLeftPanel
          fileName="bill-01.png"
          onBack={handleBack}
          useMockData={true}
          showBoundingBoxes={true}
        />

        {/* Right Panel */}
        <DetailsRightPanel
          control={control}
          fields={fields}
          selectedTemplate={selectedTemplate}
          templates={templates}
          onTemplateChange={handleTemplateChange}
          onSave={handleSave}
        />
      </div>
    </div>
  );
}
