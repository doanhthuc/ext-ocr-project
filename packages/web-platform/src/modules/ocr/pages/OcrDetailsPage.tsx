import { useNavigate } from '@tanstack/react-router';
import { Breadcrumb } from 'antd';
import { useState } from 'react';

import type { FieldData } from '~shared/components/KeyValueFieldList';

import { DetailsLeftPanel } from '~/ocr/components/DetailsLeftPanel';
import { DetailsRightPanel } from '~/ocr/components/DetailsRightPanel';

export function OcrDetailsPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('key-value-pairs');
  const [selectedTemplate, setSelectedTemplate] = useState<string>(
    'Template Bill Restaurant'
  );
  const [fields, setFields] = useState<Array<FieldData>>([
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
  ]);

  const templates = [
    { value: 'Template Bill Restaurant', label: 'Template Bill Restaurant' },
    { value: 'Template Invoice', label: 'Template Invoice' },
    { value: 'Template Receipt', label: 'Template Receipt' },
  ];

  const handleAddField = () => {
    const newField: FieldData = {
      id: Date.now().toString(),
      label: 'New Field',
      value: '',
    };
    setFields(prev => [...prev, newField]);
  };

  const handleEditField = (fieldId: string) => {
    console.log('Edit field:', fieldId);
  };

  const handleDeleteField = (fieldId: string) => {
    setFields(prev => prev.filter(field => field.id !== fieldId));
  };

  const handleFieldChange = (fieldId: string, value: string) => {
    setFields(prev =>
      prev.map(field => (field.id === fieldId ? { ...field, value } : field))
    );
  };

  const handleTemplateChange = (template: string) => {
    setSelectedTemplate(template);
  };

  const handleSave = () => {
    console.log('Save clicked');
  };

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
        <DetailsLeftPanel fileName="bill-01.png" onBack={handleBack} />

        {/* Right Panel */}
        <DetailsRightPanel
          activeTab={activeTab}
          onTabChange={setActiveTab}
          fields={fields}
          selectedTemplate={selectedTemplate}
          templates={templates}
          onAddField={handleAddField}
          onEditField={handleEditField}
          onDeleteField={handleDeleteField}
          onFieldChange={handleFieldChange}
          onTemplateChange={handleTemplateChange}
          onSave={handleSave}
        />
      </div>
    </div>
  );
}
