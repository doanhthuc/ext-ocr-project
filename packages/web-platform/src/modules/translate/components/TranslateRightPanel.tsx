import { Button, Tabs } from 'antd';

import { OcrEmptyState } from '~shared/components';

type TranslateRightPanelProps = {
  activeTab: string;
  onSaveAsTemplate: () => void;
  onTabChange: (key: string) => void;
  onTranslateNow: () => void;
};

const TRANSLATE_STEPS = [
  {
    number: 1,
    text: 'Upload an image/select the file to translate',
  },
  {
    number: 2,
    text: 'Select the language to translate',
  },
  {
    number: 3,
    text: 'Click Translate Now and receive the results',
  },
];

export function TranslateRightPanel({
  activeTab,
  onSaveAsTemplate,
  onTabChange,
  onTranslateNow,
}: TranslateRightPanelProps) {
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
              key: 'translate-file',
              label: 'Translate on file',
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
        <OcrEmptyState steps={TRANSLATE_STEPS} className="min-h-full" />
      </div>

      {/* Action Buttons - Fixed at bottom */}
      <div className="bg-white border-t border-gray-12 flex items-center justify-end gap-3 p-4 shrink-0">
        <Button onClick={onSaveAsTemplate}>Save As Template</Button>
        <Button type="primary" onClick={onTranslateNow}>
          Translate Now
        </Button>
      </div>
    </div>
  );
}
