import type { Control, FieldValues } from 'react-hook-form';

import { Button, Tabs } from 'antd';
import { useState } from 'react';

import type { OcrCell } from '~/ocr/types/ocr-result.type';
import type { FieldData } from '~shared/components/KeyValueFieldList';
import type { KeyValueFieldListFormData } from '~shared/schemas';

import { useOcrDetailsStore } from '~/ocr/stores/ocr-details.store';
import { KeyValueFieldList, SaveAsTemplateModal } from '~shared/components';

import { OcrSelectableDisplay } from './OcrSelectableDisplay';

type DetailsRightPanelProps<
  TFieldValues extends FieldValues = KeyValueFieldListFormData,
> = {
  fields: Array<FieldData>;
  ocrCells?: Array<OcrCell>;
  onSave: () => void;
  onSaveAsTemplate?: (templateName: string) => void;
  onTemplateChange?: (template: string) => void;
  selectedTemplate?: string;
  templates?: Array<{ label: string; value: string }>;
  /** React Hook Form control (optional - for form integration) */
  control?: Control<TFieldValues>;
  /** Legacy callbacks (for backward compatibility) */
  onAddField?: () => void;
  onDeleteField?: (fieldId: string) => void;
  onEditField?: (fieldId: string) => void;
  onFieldChange?: (fieldId: string, value: string) => void;
};

export function DetailsRightPanel<
  TFieldValues extends FieldValues = KeyValueFieldListFormData,
>({
  fields,
  ocrCells: propOcrCells,
  control,
  onAddField,
  onDeleteField,
  onEditField,
  onFieldChange,
  onSave,
  onSaveAsTemplate,
  onTemplateChange,
  selectedTemplate,
  templates,
}: DetailsRightPanelProps<TFieldValues>) {
  const [isSaveAsTemplateModalOpen, setIsSaveAsTemplateModalOpen] =
    useState(false);
  const { activeTab, ocrResults, selectedImageIndex, setActiveTab } =
    useOcrDetailsStore();

  const handleSaveAsTemplate = (templateName: string) => {
    onSaveAsTemplate?.(templateName);
    setIsSaveAsTemplateModalOpen(false);
  };

  // Determine which OCR cells to display
  // Priority: ocrResults[selectedImageIndex] > propOcrCells
  const currentPage = ocrResults?.[selectedImageIndex];
  const ocrCells = currentPage?.cells ?? propOcrCells;
  const imageHeight = currentPage?.input_height ?? 1008;
  const imageWidth = currentPage?.input_width ?? 756;

  return (
    <div className="bg-white rounded-xl flex flex-col h-full overflow-hidden">
      {/* Tabs */}
      <div className="shrink-0 px-4">
        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
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
            control={control}
            fieldsName="fields"
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
          <div className="flex-1 overflow-hidden">
            {ocrCells && ocrCells.length > 0 ? (
              <OcrSelectableDisplay
                cells={ocrCells}
                imageHeight={imageHeight}
                imageWidth={imageWidth}
              />
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <p className="text-text-placeholder">No OCR data available</p>
              </div>
            )}
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
