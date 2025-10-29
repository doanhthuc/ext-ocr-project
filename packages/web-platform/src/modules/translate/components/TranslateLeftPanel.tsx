import { Button, Divider, Select } from 'antd';

import type { FileType } from '~shared/components/FileItem';

import { UploadedFileList } from '~/ocr/components/UploadedFileList';
import { IconArrowRight02Sharp } from '~icons';
import { UploadZone } from '~shared/components';

type UploadedFile = {
  fileName: string;
  fileSize: string;
  fileType: FileType;
  id: string;
  progress?: number;
  status?: 'uploading' | 'uploaded' | 'completed' | 'idle';
  statusText?: string;
};

type TranslateLeftPanelProps = {
  files?: Array<UploadedFile>;
  onFileCheckChange?: (fileId: string) => (checked: boolean) => void;
  onFileDetailsClick?: (fileId: string) => void;
  onSourceLanguageChange?: (language: string) => void;
  onTargetLanguageChange?: (language: string) => void;
  onTranslateNow: () => void;
  selectedFiles?: Array<string>;
  sourceLanguage?: string;
  targetLanguage?: string;
};

const languageOptions = [
  { value: 'vi', label: 'Vietnamese' },
  { value: 'en', label: 'English' },
  { value: 'zh', label: 'Chinese' },
  { value: 'ja', label: 'Japanese' },
  { value: 'ko', label: 'Korean' },
  { value: 'fr', label: 'French' },
  { value: 'de', label: 'German' },
  { value: 'es', label: 'Spanish' },
];

export function TranslateLeftPanel({
  files = [],
  onFileCheckChange,
  onFileDetailsClick,
  onSourceLanguageChange,
  onTargetLanguageChange,
  onTranslateNow,
  selectedFiles = [],
  sourceLanguage = 'vi',
  targetLanguage = 'en',
}: TranslateLeftPanelProps) {
  return (
    <div className="bg-white rounded-xl flex flex-col h-full overflow-hidden">
      {/* Content Area */}
      <div className="flex-1 flex flex-col gap-3 p-4 overflow-hidden min-h-0">
        {/* Choose languages */}
        <div className="flex flex-col gap-4 shrink-0">
          <h3 className="text-base font-semibold text-gray-1 leading-6">
            Choose languages
          </h3>
          <div className="flex items-center gap-2 w-full">
            {/* Source Language Selector */}
            <div className="flex-1">
              <Select
                value={sourceLanguage}
                onChange={onSourceLanguageChange}
                className="w-full [&_.ant-select-selector]:!rounded-full [&_.ant-select-selector]:!h-9 [&_.ant-select-selector]:!px-3"
              >
                {languageOptions.map(option => (
                  <Select.Option key={option.value} value={option.value}>
                    {option.label}
                  </Select.Option>
                ))}
              </Select>
            </div>

            <div className="flex items-center justify-center shrink-0">
              <IconArrowRight02Sharp className="w-6 h-6 text-text-dark" />
            </div>

            {/* Target Language Selector */}
            <div className="flex-1">
              <Select
                value={targetLanguage}
                onChange={onTargetLanguageChange}
                className="w-full [&_.ant-select-selector]:!rounded-full [&_.ant-select-selector]:!h-9 [&_.ant-select-selector]:!px-3"
              >
                {languageOptions.map(option => (
                  <Select.Option key={option.value} value={option.value}>
                    {option.label}
                  </Select.Option>
                ))}
              </Select>
            </div>
          </div>
        </div>

        <Divider className="my-0" />

        {/* Import pictures */}
        <div className="flex-1 bg-white flex flex-col gap-4 rounded-bl-lg rounded-br-lg relative min-h-0">
          <h3 className="text-base font-semibold text-gray-1 leading-6 shrink-0">
            Import pictures
          </h3>

          {/* Upload Zone - Fixed */}
          <div className="shrink-0">
            <UploadZone
              uploadText="Click to upload"
              dragText="or drag and drop"
              formatText="PNG, JPG or JPEG (max. 10MB)"
              allowExts={['png', 'jpg', 'jpeg']}
              accept="image/png,image/jpeg"
              multiple
            />
          </div>

          {/* File List - Scrollable when overflow */}
          <div className="flex-1 overflow-y-auto min-h-0">
            <UploadedFileList
              files={files}
              selectedFiles={selectedFiles}
              onFileCheckChange={onFileCheckChange}
              onFileActionClick={onFileDetailsClick}
              actionText="Details"
            />
          </div>
        </div>
      </div>

      {/* Action Buttons - Fixed at bottom */}
      <div className="bg-white border-t border-gray-12 flex items-center justify-end gap-3 p-4 shrink-0">
        <Button type="primary" onClick={onTranslateNow}>
          Translate Now
        </Button>
      </div>
    </div>
  );
}
