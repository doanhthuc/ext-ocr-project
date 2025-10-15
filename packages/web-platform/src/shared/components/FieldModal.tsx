import { Button, Input, Modal, Typography } from 'antd';
import { useEffect, useState } from 'react';

import { IconX } from '~icons';
import { useTranslation } from '~shared/hooks/useTranslation';
import { cn } from '~shared/utils/cn.util';

const { Text, Title } = Typography;

export type FieldModalProps = {
  /** Whether the modal is open */
  isOpen: boolean;
  /** Callback when modal is closed */
  onClose: () => void;
  /** Callback when confirm button is clicked */
  onConfirm: (labelName: string) => void;
  /** Modal mode - 'create' or 'edit' */
  mode: 'create' | 'edit';
  /** Initial value for edit mode */
  initialValue?: string;
  /** Whether the confirm button should show loading state */
  loading?: boolean;
};

export function FieldModal({
  isOpen,
  onClose,
  onConfirm,
  mode,
  initialValue = '',
  loading = false,
}: FieldModalProps) {
  const { t } = useTranslation();
  const [labelName, setLabelName] = useState(initialValue);

  useEffect(() => {
    setLabelName(initialValue);
  }, [initialValue, isOpen]);

  const handleConfirm = () => {
    if (labelName.trim() && !loading) {
      onConfirm(labelName.trim());
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && labelName.trim() && !loading) {
      handleConfirm();
    }
  };

  const title =
    mode === 'create' ? t('ocr.field.createTitle') : t('ocr.field.editTitle');
  const placeholder = mode === 'create' ? t('ocr.field.placeholder') : '';

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
          <Title level={4}>{title}</Title>
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
          <label htmlFor="label-name-input">
            <Text>{t('ocr.field.labelName')}</Text>
          </label>

          {/* Input Field */}
          <Input
            id="label-name-input"
            value={labelName}
            onChange={e => setLabelName(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            autoFocus
            disabled={loading}
            className={cn('rounded-lg border-gray-12')}
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
          disabled={!labelName.trim() || loading}
          loading={loading}
        >
          {t('ocr.field.confirm')}
        </Button>
      </div>
    </Modal>
  );
}
