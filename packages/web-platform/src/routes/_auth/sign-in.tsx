import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { Button, Form, Input, Typography, Divider, Card, Alert } from 'antd';
import { useState } from 'react';

import { useAuth } from '~/auth/hooks/useAuth';
import { IconGoogle } from '~icons';
import { DashboardIllustration } from '~shared/components/DashboardIllustration';
import { LogoFilled } from '~shared/components/logo/LogoFilled';

const { Title } = Typography;

// Test credentials for demo
const TEST_CREDENTIALS = [
  {
    email: 'admin@example.com',
    password: 'admin123',
    role: 'admin',
  },
  {
    email: 'user@example.com',
    password: 'user123',
    role: 'user',
  },
];

export const Route = createFileRoute('/_auth/sign-in')({
  component: SignInPage,
});

function SignInPage() {
  const { redirectWithProvider, signIn } = useAuth();
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handlePasswordLogin = async (values: {
    email: string;
    password: string;
  }) => {
    setLoading(true);
    try {
      const result = await signIn({
        email: values.email,
        password: values.password,
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
    <div className="h-screen grid grid-cols-2">
      <div className="max-w-96 flex items-center flex-col justify-center mx-auto">
        <LogoFilled className="size-25 mb-6" />

        <Title level={1} className="text-center mb-6">
          Sign in to get started
        </Title>

        <Card className="w-full mb-6">
          <Title level={4} className="text-center mb-4">
            Demo Login
          </Title>

          <Alert
            message="Available Test Accounts"
            description={
              <div className="mt-2 space-y-1">
                {TEST_CREDENTIALS.map((cred, index) => (
                  <div key={index} className="text-sm">
                    <strong>{cred.role.toUpperCase()}:</strong> {cred.email} /{' '}
                    {cred.password}
                  </div>
                ))}
              </div>
            }
            type="info"
            className="mb-4"
          />

          <Form
            form={form}
            onFinish={handlePasswordLogin}
            layout="vertical"
            size="large"
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: 'Please input your email!' },
                { type: 'email', message: 'Please enter a valid email!' },
              ]}
            >
              <Input placeholder="Enter your email" />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: 'Please input your password!' },
              ]}
            >
              <Input.Password placeholder="Enter your password" />
            </Form.Item>

            <Form.Item className="mb-0">
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
        </Card>

        <Divider>OR</Divider>

        <Button
          className="w-full gap-3.5"
          size="large"
          onClick={() => redirectWithProvider('google')}
        >
          <IconGoogle className="size-5" />
          Continue with Google
        </Button>
      </div>

      <DashboardIllustration />
    </div>
  );
}
