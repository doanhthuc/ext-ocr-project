import { Button, Divider } from 'antd';

import type { FileType } from '~shared/components/FileItem';

import { TemplateCard, UploadZone } from '~shared/components';

import { UploadedFileList } from './UploadedFileList';

type Template = {
  id: number;
  lastModified: string;
  title: string;
};

type UploadedFile = {
  fileName: string;
  fileSize: string;
  fileType: FileType;
  id: string;
  progress?: number;
  status?: 'uploading' | 'uploaded' | 'completed' | 'idle';
  statusText?: string;
};

type ImportLeftPanelProps = {
  files?: Array<UploadedFile>;
  onFileCheckChange?: (fileId: string) => (checked: boolean) => void;
  onFileDetailsClick?: (fileId: string) => void;
  onOcrNow: () => void;
  onTemplateChange: (index: number) => (checked: boolean) => void;
  selectedFiles?: Array<string>;
  selectedTemplate: number | null;
  templates: Array<Template>;
};

export function ImportLeftPanel({
  files = [],
  onFileCheckChange,
  onFileDetailsClick,
  onOcrNow,
  onTemplateChange,
  selectedFiles = [],
  selectedTemplate,
  templates,
}: ImportLeftPanelProps) {
  return (
    <div className="bg-white rounded-xl flex flex-col h-full overflow-hidden">
      {/* Content Area */}
      <div className="flex-1 flex flex-col gap-3 p-4 overflow-hidden min-h-0">
        {/* Choose templates */}
        <div className="flex flex-col gap-4 h-[220px] overflow-hidden rounded-bl-lg rounded-br-lg relative shrink-0">
          <h3 className="text-base font-semibold text-gray-1 leading-6 shrink-0">
            Choose templates
          </h3>
          <div className="flex flex-col gap-2 overflow-y-auto">
            {templates.map((template, index) => (
              <TemplateCard
                key={template.id}
                title={template.title}
                lastModified={template.lastModified}
                checked={selectedTemplate === index}
                onChange={onTemplateChange(index)}
              />
            ))}
          </div>
          {/* Gradient overlay for scrollable area */}
          <div className="absolute left-0 top-[190px] w-full h-[30px] bg-gradient-to-t from-[rgba(231,232,233,0.8)] to-transparent" />
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
              formatText="PNG, JPG or GIF (max. 10MB)"
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
        <Button type="primary" onClick={onOcrNow}>
          OCR Now
        </Button>
      </div>
    </div>
  );
}
