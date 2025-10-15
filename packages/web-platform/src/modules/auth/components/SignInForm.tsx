import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from '@tanstack/react-router';
import { Button, Checkbox, Form, Input, Typography } from 'antd';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

import { useAuth } from '~/auth/hooks/useAuth';
import { useTranslation } from '~shared/hooks/useTranslation';

const { Text, Title } = Typography;

// Zod schema for sign-in validation
const signInSchema = z.object({
  email: z
    .string()
    .min(1, 'Please input your email!')
    .email('Please enter a valid email!'),
  password: z.string().min(1, 'Please input your password!'),
  remember: z.boolean().optional(),
});

type SignInFormData = z.infer<typeof signInSchema>;

type SignInFormProps = {
  onForgotPassword?: () => void;
  onSignUp?: () => void;
};

function SignInForm({ onForgotPassword, onSignUp }: SignInFormProps) {
  const { signIn } = useAuth();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    mode: 'onBlur',
    defaultValues: {
      email: '',
      password: '',
      remember: false,
    },
  });

  const onSubmit = async (data: SignInFormData) => {
    setLoading(true);
    try {
      const result = await signIn({
        email: data.email,
        password: data.password,
      });
      console.log('Sign in successful, user:', result);

      // Wait a bit for the auth state to update
      setTimeout(() => {
        navigate({ to: '/dashboard' });
      }, 100);
    } catch (_error) {
      // Error is already handled by useAuth hook
      console.error('Sign in failed:', _error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-[calc(100vh-5rem)] items-center justify-center bg-white px-[9.25rem]">
      <div className="w-full max-w-xl">
        {/* Title Section */}
        <div className="mb-8 flex flex-col items-center gap-3 text-center">
          <Text className="text-2xl font-medium leading-9 text-text-dark">
            Welcome to
          </Text>
          <div className="flex flex-col items-center gap-1">
            <Title
              level={1}
              className="!mb-0 bg-gradient-to-b from-brand-900 to-brand-800 bg-clip-text text-6xl font-bold leading-[4.5rem] text-transparent"
            >
              VietMind&apos;s IDP
            </Title>
            <Text className="bg-gradient-to-b from-brand-900 to-brand-800 bg-clip-text text-3xl font-semibold leading-[2.875rem] text-transparent">
              (Intelligent Document Processing)
            </Text>
          </div>
        </div>

        {/* Sign In Form */}
        <Form
          onFinish={handleSubmit(onSubmit)}
          layout="vertical"
          className="mb-6"
        >
          {/* Email Field */}
          <Form.Item
            label={<Text>Email Address</Text>}
            validateStatus={errors.email ? 'error' : ''}
            help={errors.email?.message}
          >
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Enter your email address"
                  status={errors.email ? 'error' : undefined}
                  disabled={loading}
                />
              )}
            />
          </Form.Item>

          {/* Password Field */}
          <Form.Item
            label={<Text>{t('auth.password')}</Text>}
            validateStatus={errors.password ? 'error' : ''}
            help={errors.password?.message}
          >
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <Input.Password
                  {...field}
                  placeholder="Enter your password"
                  status={errors.password ? 'error' : undefined}
                  disabled={loading}
                />
              )}
            />
          </Form.Item>

          {/* Remember me & Forgot Password */}
          <div className="flex items-center justify-between mb-6">
            <Form.Item name="remember" className="mb-0">
              <Controller
                name="remember"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <Checkbox
                    checked={value}
                    onChange={onChange}
                    disabled={loading}
                    className="text-sm text-gray-blue-800"
                  >
                    Remember me
                  </Checkbox>
                )}
              />
            </Form.Item>
            {onForgotPassword ? (
              <Button
                type="link"
                onClick={onForgotPassword}
                disabled={loading}
                className="h-auto p-0 text-sm font-medium text-blue-4"
              >
                Forgot Password?
              </Button>
            ) : (
              <Link
                to="."
                className="text-sm font-medium text-blue-4 no-underline"
              >
                Forgot Password?
              </Link>
            )}
          </div>

          {/* Sign In Button */}
          <Form.Item className="!mb-0">
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              className="w-full"
            >
              Sign In
            </Button>
          </Form.Item>
        </Form>

        {/* Sign Up Link */}
        <div className="text-center">
          <Text>Don&apos;t have an account? </Text>
          {onSignUp ? (
            <Button
              type="link"
              onClick={onSignUp}
              className="h-auto p-0 text-blue-4"
            >
              Sign Up
            </Button>
          ) : (
            <Link to="." className="text-blue-4">
              Sign Up
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default SignInForm;
