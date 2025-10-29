import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Form, Input, Modal, Typography } from 'antd';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

import { IconX } from '~icons';
import { useTranslation } from '~shared/hooks/useTranslation';
import { cn } from '~shared/utils/cn.util';

const { Text, Title } = Typography;

const signUpSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(
      /[^A-Za-z0-9]/,
      'Password must contain at least one special character'
    ),
  firstName: z
    .string()
    .min(1, 'Please enter your first name')
    .max(50, 'First name must not exceed 50 characters')
    .regex(
      /^[a-zA-Z\s'-]+$/,
      'First name can only contain letters, spaces, hyphens, and apostrophes'
    ),
  lastName: z
    .string()
    .min(1, 'Please enter your last name')
    .max(50, 'Last name must not exceed 50 characters')
    .regex(
      /^[a-zA-Z\s'-]+$/,
      'Last name can only contain letters, spaces, hyphens, and apostrophes'
    ),
});

type SignUpFormData = z.infer<typeof signUpSchema>;

export type SignUpModalProps = {
  /** Whether the modal is open */
  isOpen: boolean;
  /** Callback when modal is closed */
  onClose: () => void;
  /** Callback when sign up button is clicked */
  onSignUp: (data: SignUpFormData) => void;
  /** Whether the sign up button should show loading state */
  loading?: boolean;
};

export function SignUpModal({
  isOpen,
  onClose,
  onSignUp,
  loading = false,
}: SignUpModalProps) {
  const { t } = useTranslation();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    mode: 'onSubmit',
    defaultValues: {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
    },
  });

  useEffect(() => {
    if (!isOpen) {
      reset();
    }
  }, [isOpen, reset]);

  const onSubmit = (data: SignUpFormData) => {
    if (!loading) {
      onSignUp(data);
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
      <div className="flex flex-col gap-8 bg-white px-6 pb-8 pt-8">
        {/* Title */}
        <div className="flex flex-col items-center gap-3">
          <Title
            level={2}
            className="!m-0 !text-[26px] !font-medium !leading-9 !text-text-dark"
          >
            {t('auth.signUp')}
          </Title>
        </div>

        {/* Form */}
        <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
          {/* First Name Input */}
          <Controller
            name="firstName"
            control={control}
            render={({ field }) => (
              <Form.Item
                label={
                  <Text className="text-sm leading-5 text-text-dark">
                    First Name
                  </Text>
                }
                validateStatus={errors.firstName ? 'error' : ''}
                help={errors.firstName?.message}
              >
                <Input
                  {...field}
                  id="signup-firstname-input"
                  placeholder="Enter your first name"
                  autoFocus
                  disabled={loading}
                  status={errors.firstName ? 'error' : undefined}
                  className={cn('rounded-lg border-gray-12 px-4 py-2.5')}
                />
              </Form.Item>
            )}
          />

          {/* Last Name Input */}
          <Controller
            name="lastName"
            control={control}
            render={({ field }) => (
              <Form.Item
                label={
                  <Text className="text-sm leading-5 text-text-dark">
                    Last Name
                  </Text>
                }
                validateStatus={errors.lastName ? 'error' : ''}
                help={errors.lastName?.message}
              >
                <Input
                  {...field}
                  id="signup-lastname-input"
                  placeholder="Enter your last name"
                  disabled={loading}
                  status={errors.lastName ? 'error' : undefined}
                  className={cn('rounded-lg border-gray-12 px-4 py-2.5')}
                />
              </Form.Item>
            )}
          />

          {/* Email Input */}
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <Form.Item
                label={
                  <Text className="text-sm leading-5 text-text-dark">
                    {t('auth.emailAddress')}
                  </Text>
                }
                validateStatus={errors.email ? 'error' : ''}
                help={errors.email?.message}
              >
                <Input
                  {...field}
                  id="signup-email-input"
                  type="email"
                  placeholder={t('auth.enterYourEmailAddress')}
                  disabled={loading}
                  status={errors.email ? 'error' : undefined}
                  className={cn('rounded-lg border-gray-12 px-4 py-2.5')}
                />
              </Form.Item>
            )}
          />

          {/* Password Input */}
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <Form.Item
                label={
                  <Text className="text-sm leading-5 text-text-dark">
                    {t('auth.password')}
                  </Text>
                }
                validateStatus={errors.password ? 'error' : ''}
                help={errors.password?.message}
              >
                <Input.Password
                  {...field}
                  id="signup-password-input"
                  placeholder={t('auth.enterYourPassword')}
                  disabled={loading}
                  status={errors.password ? 'error' : undefined}
                  className={cn('rounded-lg border-gray-12 px-4 py-2.5')}
                />
              </Form.Item>
            )}
          />

          {/* Create Account Button */}
          <Form.Item className="!mb-0">
            <Button
              type="primary"
              htmlType="submit"
              disabled={loading}
              loading={loading}
              className="mt-2 w-full rounded-full px-3 py-2.5"
            >
              {t('auth.createAccount')}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
}
