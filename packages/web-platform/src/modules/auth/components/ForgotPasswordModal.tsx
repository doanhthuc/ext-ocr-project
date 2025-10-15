import { Button, Input, Modal, Typography } from 'antd';
import { useEffect, useState } from 'react';

import { IconInfo, IconX } from '~icons';
import { useTranslation } from '~shared/hooks/useTranslation';
import { cn } from '~shared/utils/cn.util';

const { Text, Title } = Typography;

export type ForgotPasswordModalProps = {
  /** Whether the modal is open */
  isOpen: boolean;
  /** Callback when modal is closed */
  onClose: () => void;
  /** Callback when confirm button is clicked */
  onConfirm: (email: string) => void;
  /** Whether the confirm button should show loading state */
  loading?: boolean;
};

export function ForgotPasswordModal({
  isOpen,
  onClose,
  onConfirm,
  loading = false,
}: ForgotPasswordModalProps) {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (!isOpen) {
      setEmail('');
    }
  }, [isOpen]);

  const handleConfirm = () => {
    if (email.trim() && !loading) {
      onConfirm(email.trim());
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && email.trim() && !loading) {
      handleConfirm();
    }
  };

  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      width={400}
      centered
      footer={null}
      closable={false}
      className={cn(
        '[&_.ant-modal-content]:rounded-2xl [&_.ant-modal-content]:overflow-hidden',
        '[&_.ant-modal-body]:p-0'
      )}
    >
      {/* Custom Header */}
      <div className="flex items-center justify-end bg-white px-4 py-3">
        <Button
          type="text"
          icon={<IconX className="size-6" />}
          onClick={onClose}
          disabled={loading}
          className="flex size-6 shrink-0 items-center justify-center p-0 text-text-dark"
          aria-label="Close"
        />
      </div>

      {/* Body Content */}
      <div className="flex flex-col items-center gap-8 bg-white px-6 pb-8">
        {/* Icon and Title Section */}
        <div className="flex flex-col items-center gap-3">
          {/* Icon */}
          <div className="flex size-6 items-center justify-center">
            <IconInfo className="size-6 text-blue-4" />
          </div>

          {/* Title and Description */}
          <div className="flex flex-col items-center gap-2">
            <Title
              level={2}
              className="!m-0 !text-[26px] !font-medium !leading-9 !text-text-dark"
            >
              {t('auth.forgotPassword')}
            </Title>
            <Text className="text-center text-sm leading-5 text-gray-blue-800">
              {t('auth.forgotPasswordDescription')}
            </Text>
          </div>
        </div>

        {/* Input Section */}
        <div className="flex w-full flex-col gap-4">
          <div className="flex flex-col gap-1">
            {/* Label */}
            <label htmlFor="email-input">
              <Text className="text-sm leading-5 text-text-dark">
                {t('auth.emailAddress')}
              </Text>
            </label>

            {/* Input Field */}
            <Input
              id="email-input"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={t('auth.enterYourEmailAddress')}
              autoFocus
              disabled={loading}
              className={cn('rounded-lg border-gray-12 px-4 py-2.5')}
            />
          </div>
        </div>

        {/* Confirm Button */}
        <Button
          type="primary"
          onClick={handleConfirm}
          disabled={!email.trim() || loading}
          loading={loading}
          className="w-full rounded-full px-3 py-2.5"
        >
          {t('common.confirm')}
        </Button>
      </div>
    </Modal>
  );
}
