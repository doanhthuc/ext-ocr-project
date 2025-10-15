import { Button, Input, Modal, Typography } from 'antd';
import { useEffect, useState } from 'react';

import { IconX } from '~icons';
import { useTranslation } from '~shared/hooks/useTranslation';
import { cn } from '~shared/utils/cn.util';

const { Text, Title } = Typography;

export type SaveAsTemplateModalProps = {
  /** Whether the modal is open */
  isOpen: boolean;
  /** Callback when modal is closed */
  onClose: () => void;
  /** Callback when confirm button is clicked */
  onConfirm: (templateName: string) => void;
  /** Initial value for template name */
  initialValue?: string;
  /** Whether the confirm button should show loading state */
  loading?: boolean;
};

export function SaveAsTemplateModal({
  isOpen,
  onClose,
  onConfirm,
  initialValue = '',
  loading = false,
}: SaveAsTemplateModalProps) {
  const { t } = useTranslation();
  const [templateName, setTemplateName] = useState(initialValue);

  useEffect(() => {
    setTemplateName(initialValue);
  }, [initialValue, isOpen]);

  const handleConfirm = () => {
    if (templateName.trim() && !loading) {
      onConfirm(templateName.trim());
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && templateName.trim() && !loading) {
      handleConfirm();
    }
  };

  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      width={448}
      centered
      footer={null}
      closable={false}
      className={cn(
        '[&_.ant-modal-content]:rounded-2xl [&_.ant-modal-content]:overflow-hidden',
        '[&_.ant-modal-body]:p-0'
      )}
    >
      {/* Custom Header */}
      <div className="flex items-center gap-1.5 bg-white px-4 py-3">
        <div className="flex grow flex-col gap-1">
          <Title
            level={3}
            className="!m-0 !font-archivo !text-[22px] !font-semibold !leading-8 !text-text-primary"
          >
            {t('ocr.template.saveAsTitle')}
          </Title>
        </div>
        <Button
          type="text"
          icon={<IconX className="size-6" />}
          onClick={onClose}
          disabled={loading}
          className="flex size-6 shrink-0 items-center justify-center p-0 text-text-dark"
          aria-label="Close"
        />
      </div>

      {/* Divider */}
      <div className="h-px w-full bg-border-lighter" />

      {/* Body Content */}
      <div className="flex flex-col gap-2 bg-white p-4">
        <div className="flex flex-col gap-1">
          {/* Label */}
          <label htmlFor="template-name-input">
            <Text className="!font-archivo !text-sm !font-normal !leading-5 !text-text-dark">
              {t('ocr.template.templateName')}
            </Text>
          </label>

          {/* Input Field */}
          <Input
            id="template-name-input"
            value={templateName}
            onChange={e => setTemplateName(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={t('ocr.template.placeholder')}
            autoFocus
            disabled={loading}
            className={cn(
              'rounded-lg border-gray-12',
              '[&_.ant-input]:font-archivo [&_.ant-input]:text-sm',
              '[&_.ant-input]:font-normal [&_.ant-input]:leading-5'
            )}
          />
        </div>
      </div>

      {/* Custom Footer */}
      <div className="flex w-full items-center justify-end gap-3 border-t border-gray-12 bg-white p-4">
        <Button type="default" onClick={onClose} disabled={loading}>
          {t('common.cancel')}
        </Button>
        <Button
          type="primary"
          onClick={handleConfirm}
          disabled={!templateName.trim() || loading}
          loading={loading}
        >
          {t('ocr.field.confirm')}
        </Button>
      </div>
    </Modal>
  );
}
