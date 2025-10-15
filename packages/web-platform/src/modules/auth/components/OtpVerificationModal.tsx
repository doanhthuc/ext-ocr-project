import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input, Modal, Typography } from 'antd';
import { useEffect, useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

import { IconX } from '~icons';
import { useTranslation } from '~shared/hooks/useTranslation';
import { cn } from '~shared/utils/cn.util';

const { Text, Title } = Typography;

// Zod schema for OTP validation
const otpSchema = z.object({
  digit1: z.string().regex(/^\d$/, 'Must be a single digit'),
  digit2: z.string().regex(/^\d$/, 'Must be a single digit'),
  digit3: z.string().regex(/^\d$/, 'Must be a single digit'),
  digit4: z.string().regex(/^\d$/, 'Must be a single digit'),
});

type OtpFormData = z.infer<typeof otpSchema>;

export type OtpVerificationModalProps = {
  /** Whether the modal is open */
  isOpen: boolean;
  /** Callback when modal is closed */
  onClose: () => void;
  /** Callback when confirm button is clicked */
  onConfirm: (otp: string) => void;
  /** Email address for display */
  email?: string;
  /** Whether the confirm button should show loading state */
  loading?: boolean;
  /** Callback when resend is clicked */
  onResend?: () => void;
  /** Error message to display */
  error?: string;
};

export function OtpVerificationModal({
  isOpen,
  onClose,
  onConfirm,
  email = '',
  loading = false,
  onResend,
  error,
}: OtpVerificationModalProps) {
  const { t } = useTranslation();
  const inputRefs = useRef<Array<HTMLInputElement>>([]);

  const {
    control,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { isValid },
  } = useForm<OtpFormData>({
    resolver: zodResolver(otpSchema),
    mode: 'onChange',
    defaultValues: {
      digit1: '',
      digit2: '',
      digit3: '',
      digit4: '',
    },
  });

  const digits = watch();

  useEffect(() => {
    if (!isOpen) {
      reset();
    } else {
      // Focus first input when modal opens
      setTimeout(() => {
        inputRefs.current[0]?.focus();
      }, 100);
    }
  }, [isOpen, reset]);

  const handleChange = (
    index: number,
    value: string,
    onChange: (value: string) => void
  ) => {
    // Only allow digits
    const digit = value.replace(/\D/g, '').slice(-1);
    onChange(digit);

    // Auto-focus next input
    if (digit && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    const digitKey = `digit${index + 1}` as keyof OtpFormData;
    if (e.key === 'Backspace' && !digits[digitKey] && index > 0) {
      // Move to previous input on backspace if current is empty
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'Enter' && isValid) {
      handleSubmit(onSubmit)();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData
      .getData('text')
      .replace(/\D/g, '')
      .slice(0, 4);

    if (pastedData.length > 0) {
      setValue('digit1', pastedData[0] || '');
      setValue('digit2', pastedData[1] || '');
      setValue('digit3', pastedData[2] || '');
      setValue('digit4', pastedData[3] || '');

      // Focus the next empty input or the last one
      const focusIndex = Math.min(pastedData.length, 3);
      inputRefs.current[focusIndex]?.focus();
    }
  };

  const onSubmit = (data: OtpFormData) => {
    if (!loading) {
      const otpValue = `${data.digit1}${data.digit2}${data.digit3}${data.digit4}`;
      onConfirm(otpValue);
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
      <div className="flex flex-col items-center gap-6 bg-white px-6 pb-6">
        {/* Title Section */}
        <div className="flex flex-col items-center gap-2">
          <Title
            level={2}
            className="!m-0 !text-[26px] !font-medium !leading-9 !text-text-dark"
          >
            {t('auth.otpVerification')}
          </Title>
          <div className="text-center">
            <Text className="text-sm leading-5 text-gray-blue-800">
              {t('auth.otpVerificationDescription')}{' '}
            </Text>
            <Text className="text-sm leading-5 text-gray-blue-800">
              <span className="font-semibold">{email}</span>.{' '}
              {onResend && (
                <Button
                  type="link"
                  onClick={onResend}
                  disabled={loading}
                  className="h-auto p-0 text-sm leading-5 text-blue-4"
                >
                  {t('auth.resend')}
                </Button>
              )}
            </Text>
          </div>
        </div>

        {/* OTP Input Section */}
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <div className="flex w-full flex-col gap-2">
            <div className="flex gap-3 justify-center">
              {(['digit1', 'digit2', 'digit3', 'digit4'] as const).map(
                (fieldName, index) => (
                  <Controller
                    key={fieldName}
                    name={fieldName}
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        ref={el => {
                          if (el?.input) {
                            inputRefs.current[index] = el.input;
                          }
                        }}
                        onChange={e =>
                          handleChange(index, e.target.value, field.onChange)
                        }
                        onKeyDown={e => handleKeyDown(index, e)}
                        onPaste={handlePaste}
                        maxLength={1}
                        disabled={loading}
                        status={error ? 'error' : undefined}
                        className={cn(
                          'size-14 rounded-xl border-gray-12 text-center text-2xl font-semibold',
                          field.value && !error && 'border-blue-4'
                        )}
                      />
                    )}
                  />
                )
              )}
            </div>
            {error && (
              <Text className="text-center text-sm leading-5 text-error">
                {error}
              </Text>
            )}
          </div>

          {/* Confirm Button */}
          <Button
            type="primary"
            htmlType="submit"
            disabled={!isValid || loading}
            loading={loading}
            className="w-full rounded-full px-3 py-2.5 mt-6"
          >
            {t('common.confirm')}
          </Button>
        </form>
      </div>
    </Modal>
  );
}
