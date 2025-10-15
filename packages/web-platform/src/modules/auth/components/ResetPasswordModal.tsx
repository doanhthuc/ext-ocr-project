import { Button, Input, Modal, Typography } from 'antd';
import { useEffect, useState } from 'react';

import { IconX } from '~icons';
import { useTranslation } from '~shared/hooks/useTranslation';
import { cn } from '~shared/utils/cn.util';

const { Text, Title } = Typography;

type PasswordValidation = {
  hasUppercase: boolean;
  hasMinLength: boolean;
  hasSpecialChar: boolean;
};

export type ResetPasswordModalProps = {
  /** Whether the modal is open */
  isOpen: boolean;
  /** Callback when modal is closed */
  onClose: () => void;
  /** Callback when confirm button is clicked */
  onConfirm: (password: string) => void;
  /** Whether the confirm button should show loading state */
  loading?: boolean;
};

export function ResetPasswordModal({
  isOpen,
  onClose,
  onConfirm,
  loading = false,
}: ResetPasswordModalProps) {
  const { t } = useTranslation();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [validation, setValidation] = useState<PasswordValidation>({
    hasUppercase: false,
    hasMinLength: false,
    hasSpecialChar: false,
  });

  useEffect(() => {
    if (!isOpen) {
      setPassword('');
      setConfirmPassword('');
      setShowPassword(false);
      setShowConfirmPassword(false);
    }
  }, [isOpen]);

  useEffect(() => {
    setValidation({
      hasUppercase: /[A-Z]/.test(password),
      hasMinLength: password.length >= 12,
      hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    });
  }, [password]);

  const handleConfirm = () => {
    if (isPasswordValid() && !loading) {
      onConfirm(password);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && isPasswordValid() && !loading) {
      handleConfirm();
    }
  };

  const isPasswordValid = () => {
    return (
      validation.hasUppercase &&
      validation.hasMinLength &&
      validation.hasSpecialChar &&
      password === confirmPassword &&
      password.length > 0
    );
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
      <div className="flex flex-col gap-6 bg-white px-6 pb-6">
        {/* Title Section */}
        <div className="flex flex-col items-center">
          <Title
            level={2}
            className="!m-0 !text-[26px] !font-medium !leading-9 !text-text-dark"
          >
            {t('auth.resetPassword')}
          </Title>
        </div>

        {/* Input Section */}
        <div className="flex flex-col gap-4">
          {/* Password Input */}
          <div className="flex flex-col gap-1">
            <label htmlFor="password-input">
              <Text className="text-sm leading-5 text-text-dark">
                {t('auth.password')}
              </Text>
            </label>
            <Input.Password
              id="password-input"
              value={password}
              onChange={e => setPassword(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={t('auth.enterYourPassword')}
              autoFocus
              disabled={loading}
              visibilityToggle={{
                visible: showPassword,
                onVisibleChange: setShowPassword,
              }}
              className={cn('rounded-lg border-gray-12 px-4 py-2.5')}
            />
          </div>

          {/* Re-enter Password Input */}
          <div className="flex flex-col gap-1">
            <label htmlFor="confirm-password-input">
              <Text className="text-sm leading-5 text-text-dark">
                {t('auth.reenterPassword')}
              </Text>
            </label>
            <Input.Password
              id="confirm-password-input"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={t('auth.reenterYourPassword')}
              disabled={loading}
              visibilityToggle={{
                visible: showConfirmPassword,
                onVisibleChange: setShowConfirmPassword,
              }}
              className={cn('rounded-lg border-gray-12 px-4 py-2.5')}
            />
          </div>

          {/* Password Validation Rules */}
          <div className="flex flex-col gap-2">
            <ValidationItem
              isValid={validation.hasUppercase}
              text={t('auth.validation.hasUppercase')}
            />
            <ValidationItem
              isValid={validation.hasMinLength}
              text={t('auth.validation.hasMinLength')}
            />
            <ValidationItem
              isValid={validation.hasSpecialChar}
              text={t('auth.validation.hasSpecialChar')}
            />
          </div>
        </div>

        {/* Confirm Button */}
        <Button
          type="primary"
          onClick={handleConfirm}
          disabled={!isPasswordValid() || loading}
          loading={loading}
          className="w-full rounded-full px-3 py-2.5"
        >
          {t('common.confirm')}
        </Button>
      </div>
    </Modal>
  );
}

type ValidationItemProps = {
  isValid: boolean;
  text: string;
};

function ValidationItem({ isValid, text }: ValidationItemProps) {
  return (
    <div className="flex items-center gap-2">
      <div
        className={cn(
          'size-1.5 rounded-full',
          isValid ? 'bg-blue-4' : 'bg-gray-11'
        )}
      />
      <Text
        className={cn(
          'text-sm leading-5',
          isValid ? 'text-gray-blue-800' : 'text-gray-11'
        )}
      >
        {text}
      </Text>
    </div>
  );
}
