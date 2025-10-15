import { Button, Modal, Typography } from 'antd';

import { IconX } from '~icons';
import { useTranslation } from '~shared/hooks/useTranslation';
import { cn } from '~shared/utils/cn.util';

const { Text } = Typography;

export type DeleteConfirmModalProps = {
  /** Whether the modal is open */
  isOpen: boolean;
  /** Callback when modal is closed */
  onClose: () => void;
  /** Callback when confirm button is clicked */
  onConfirm: () => void;
  /** The name of the item being deleted (optional, for display) */
  itemName?: string;
  /** Whether the confirm button should show loading state */
  loading?: boolean;
};

export function DeleteConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  itemName,
  loading = false,
}: DeleteConfirmModalProps) {
  const { t } = useTranslation();

  const handleConfirm = () => {
    if (!loading) {
      onConfirm();
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
      {/* Custom Header - Only close button, no title */}
      <div className="flex items-center gap-1.5 bg-white px-4 py-3">
        <div className="grow opacity-0">
          {/* Hidden title for spacing consistency */}
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
      <div className="flex flex-col items-center gap-2 bg-white p-4">
        {/* Icon/Illustration */}
        <div className="flex size-[132px] shrink-0 items-center justify-center rounded-2xl bg-blue-light">
          {/* Placeholder for illustration - can be replaced with actual icon/image */}
          <div className="text-6xl">🗑️</div>
        </div>

        {/* Title and Description */}
        <div className="flex flex-col items-center gap-1 text-center text-text-dark">
          <Text className="font-semibold">
            {itemName
              ? t('ocr.field.delete.titleWithName', { name: itemName })
              : t('ocr.field.delete.title')}
          </Text>
          <Text>{t('ocr.field.delete.description')}</Text>
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
          disabled={loading}
          loading={loading}
        >
          {t('ocr.field.delete.confirm')}
        </Button>
      </div>
    </Modal>
  );
}
