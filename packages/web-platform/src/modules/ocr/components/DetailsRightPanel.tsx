import { Button, Tabs } from 'antd';
import { useState } from 'react';

import type { FieldData } from '~shared/components/KeyValueFieldList';

import { KeyValueFieldList, SaveAsTemplateModal } from '~shared/components';

type DetailsRightPanelProps = {
  activeTab: string;
  fields: Array<FieldData>;
  onAddField?: () => void;
  onDeleteField?: (fieldId: string) => void;
  onEditField?: (fieldId: string) => void;
  onFieldChange?: (fieldId: string, value: string) => void;
  onSave: () => void;
  onSaveAsTemplate?: (templateName: string) => void;
  onTabChange: (key: string) => void;
  onTemplateChange?: (template: string) => void;
  selectedTemplate?: string;
  templates?: Array<{ label: string; value: string }>;
};

export function DetailsRightPanel({
  activeTab,
  fields,
  onAddField,
  onDeleteField,
  onEditField,
  onFieldChange,
  onSave,
  onSaveAsTemplate,
  onTabChange,
  onTemplateChange,
  selectedTemplate,
  templates,
}: DetailsRightPanelProps) {
  const [isSaveAsTemplateModalOpen, setIsSaveAsTemplateModalOpen] =
    useState(false);

  const handleSaveAsTemplate = (templateName: string) => {
    onSaveAsTemplate?.(templateName);
    setIsSaveAsTemplateModalOpen(false);
  };

  return (
    <div className="bg-white rounded-xl flex flex-col h-full overflow-hidden">
      {/* Tabs */}
      <div className="shrink-0 px-4">
        <Tabs
          activeKey={activeTab}
          onChange={onTabChange}
          className="mb-0 [&_.ant-tabs-nav]:mb-0"
          items={[
            {
              key: 'key-value-pairs',
              label: 'Key Value Pairs',
            },
            {
              key: 'ocr',
              label: 'OCR',
            },
          ]}
        />
      </div>

      {/* Content Container */}
      <div className="flex-1 flex flex-col gap-2.5 p-4 overflow-auto">
        {/* Content Area */}
        {activeTab === 'key-value-pairs' && (
          <KeyValueFieldList
            fields={fields}
            selectedTemplate={selectedTemplate}
            templates={templates}
            onAddField={onAddField}
            onTemplateChange={onTemplateChange}
            onEditField={onEditField}
            onDeleteField={onDeleteField}
            onFieldChange={onFieldChange}
          />
        )}
        {activeTab === 'ocr' && (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-text-placeholder">OCR content coming soon</p>
          </div>
        )}
      </div>

      {/* Action Buttons - Fixed at bottom */}
      <div className="bg-white border-t border-gray-12 flex items-center justify-end gap-3 p-4 shrink-0">
        <Button onClick={() => setIsSaveAsTemplateModalOpen(true)}>
          Save As Template
        </Button>
        <Button type="primary" onClick={onSave}>
          Save
        </Button>
      </div>

      {/* Save As Template Modal */}
      <SaveAsTemplateModal
        isOpen={isSaveAsTemplateModalOpen}
        onClose={() => setIsSaveAsTemplateModalOpen(false)}
        onConfirm={handleSaveAsTemplate}
      />
    </div>
  );
}
