import { Button, Tabs } from 'antd';
import { useState } from 'react';

import type { OcrCell } from '~/ocr/types/ocr-result.type';

import { OcrSelectableDisplay } from '~/ocr/components/OcrSelectableDisplay';
import { TranslateByText } from '~/translate/components/TranslateByText';
import { useTranslateDetailsStore } from '~/translate/stores/translate-details.store';
import { IconCopy } from '~icons';
import { SaveAsTemplateModal } from '~shared/components';
import { mockOcrResults } from '~shared/mock';

type TranslateDetailsRightPanelProps = {
  ocrData?: Array<{
    cells: Array<OcrCell>;
    imageHeight: number;
    imageWidth: number;
  }>;
  onSave: () => void;
  onSaveAsTemplate?: (templateName: string) => void;
  useMockData?: boolean;
};

export function TranslateDetailsRightPanel({
  ocrData: propOcrData,
  onSave,
  onSaveAsTemplate,
  useMockData = false,
}: TranslateDetailsRightPanelProps) {
  const { selectedImageIndex } = useTranslateDetailsStore();

  // Use mock data if requested, otherwise use provided data or defaults
  const ocrData = useMockData
    ? mockOcrResults.map(result => ({
        cells: result.cells,
        imageHeight: result.input_height,
        imageWidth: result.input_width,
      }))
    : propOcrData;

  // Get current image's OCR data based on selected index
  const currentOcrData = ocrData?.[selectedImageIndex];
  const imageHeight = currentOcrData?.imageHeight || 1008;
  const imageWidth = currentOcrData?.imageWidth || 756;
  const ocrCells = currentOcrData?.cells;
  const [isSaveAsTemplateModalOpen, setIsSaveAsTemplateModalOpen] =
    useState(false);
  const [activeTab, setActiveTab] = useState('translate-file');

  const handleSaveAsTemplate = (templateName: string) => {
    onSaveAsTemplate?.(templateName);
    setIsSaveAsTemplateModalOpen(false);
  };

  const handleExport = () => {
    // TODO: Export functionality
    console.log('Export translations');
  };

  const handleShare = () => {
    // TODO: Share functionality
    console.log('Share translations');
  };

  const handleTranslateNow = () => {
    // TODO: Call translation API
    console.log('Translate Now');
  };

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
              key: 'translate-file',
              label: 'Translates on file',
            },
            {
              key: 'translate-text',
              label: 'Translate by text',
            },
          ]}
        />
      </div>

      {/* Content Container */}
      <div className="flex-1 flex flex-col gap-2.5 p-4 overflow-hidden">
        {/* Content Area */}
        {activeTab === 'translate-file' && (
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
        {activeTab === 'translate-text' && <TranslateByText />}
      </div>

      {/* Action Buttons - Fixed at bottom */}
      <div className="bg-white border-t border-gray-12 flex items-center justify-end gap-3 p-4 shrink-0">
        {activeTab === 'translate-file' && (
          <>
            <Button onClick={() => setIsSaveAsTemplateModalOpen(true)}>
              Save As Template
            </Button>
            <Button type="primary" onClick={onSave}>
              Save
            </Button>
          </>
        )}
        {activeTab === 'translate-text' && (
          <>
            <Button onClick={handleExport} icon={<IconCopy />}>
              Export
            </Button>
            <Button onClick={handleShare}>Share</Button>
            <Button type="primary" onClick={handleTranslateNow}>
              Translate Now
            </Button>
          </>
        )}
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
