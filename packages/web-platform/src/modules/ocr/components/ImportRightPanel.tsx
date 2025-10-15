import { Button, Tabs } from 'antd';

import { OcrEmptyState } from '~shared/components';

type ImportRightPanelProps = {
  activeTab: string;
  onOcrNow: () => void;
  onSaveAsTemplate: () => void;
  onTabChange: (key: string) => void;
};

export function ImportRightPanel({
  activeTab,
  onOcrNow,
  onSaveAsTemplate,
  onTabChange,
}: ImportRightPanelProps) {
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
      <div className="flex-1 flex flex-col gap-2.5 p-4 overflow-hidden">
        {/* Content Area */}
        <OcrEmptyState className="min-h-full" />
      </div>

      {/* Action Buttons - Fixed at bottom */}
      <div className="bg-white border-t border-gray-12 flex items-center justify-end gap-3 p-4 shrink-0">
        <Button onClick={onSaveAsTemplate}>Save As Template</Button>
        <Button type="primary" onClick={onOcrNow}>
          OCR Now
        </Button>
      </div>
    </div>
  );
}
