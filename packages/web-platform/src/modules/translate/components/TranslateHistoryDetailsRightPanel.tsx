import { useNavigate } from '@tanstack/react-router';
import { Button, Tabs } from 'antd';
import { useState } from 'react';

import type { OcrCell } from '~/ocr/types/ocr-result.type';

import { OcrSelectableDisplay } from '~/ocr/components/OcrSelectableDisplay';
import { useTranslateDetailsStore } from '~/translate/stores/translate-details.store';
import { IconEdit02, IconFileTypePdf, IconShare } from '~icons';

import { ReadOnlyTranslateByText } from './ReadOnlyTranslateByText';

type TranslateHistoryDetailsRightPanelProps = {
  ocrData?: Array<{
    cells: Array<OcrCell>;
    imageHeight: number;
    imageWidth: number;
  }>;
  onShare?: () => void;
  onExport?: () => void;
  documentId?: string;
};

export function TranslateHistoryDetailsRightPanel({
  ocrData: propOcrData,
  onShare,
  onExport,
  documentId = '1',
}: TranslateHistoryDetailsRightPanelProps) {
  const navigate = useNavigate();
  const { selectedImageIndex } = useTranslateDetailsStore();
  const [activeTab, setActiveTab] = useState('translate-file');

  const handleEdit = () => {
    navigate({ to: '/translate/edit/$id', params: { id: documentId } });
  };

  // Get current image's OCR data based on selected index
  const currentOcrData = propOcrData?.[selectedImageIndex];
  const imageHeight = currentOcrData?.imageHeight || 1008;
  const imageWidth = currentOcrData?.imageWidth || 756;
  const ocrCells = currentOcrData?.cells;

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
        {activeTab === 'translate-text' && <ReadOnlyTranslateByText />}
      </div>

      {/* Action Buttons - Fixed at bottom */}
      <div className="bg-white border-t border-gray-12 flex items-center justify-end gap-3 p-4 shrink-0">
        <Button icon={<IconEdit02 className="size-4" />} onClick={handleEdit}>
          Edit
        </Button>
        <Button icon={<IconShare className="size-4" />} onClick={onShare}>
          Share
        </Button>
        <Button
          type="primary"
          icon={<IconFileTypePdf className="size-4" />}
          onClick={onExport}
        >
          Export
        </Button>
      </div>
    </div>
  );
}
