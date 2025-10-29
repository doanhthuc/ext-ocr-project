import { Button, Tabs } from 'antd';

import type { OcrCell } from '~/ocr/types/ocr-result.type';
import type { FieldData } from '~shared/components/KeyValueFieldList';

import { useOcrDetailsStore } from '~/ocr/stores/ocr-details.store';
import { IconEdit02, IconFileTypePdf, IconShare } from '~icons';
import { ReadOnlyKeyValueFieldList } from '~shared/components/ReadOnlyKeyValueFieldList';

import { OcrSelectableDisplay } from './OcrSelectableDisplay';

type HistoryDetailsRightPanelProps = {
  fields: Array<FieldData>;
  ocrCells?: Array<OcrCell>;
  onEdit?: () => void;
  onShare?: () => void;
  onExport?: () => void;
};

export function HistoryDetailsRightPanel({
  fields,
  ocrCells: propOcrCells,
  onEdit,
  onShare,
  onExport,
}: HistoryDetailsRightPanelProps) {
  const { activeTab, ocrResults, selectedImageIndex, setActiveTab } =
    useOcrDetailsStore();

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
          <ReadOnlyKeyValueFieldList fields={fields} />
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
        <Button icon={<IconEdit02 className="size-4" />} onClick={onEdit}>
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
