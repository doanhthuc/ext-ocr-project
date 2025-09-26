import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';
import { Layout } from 'antd';

import { Header } from '~shared/components/layout/Header';
import { Sidebar } from '~shared/components/layout/Sidebar';

const { Content } = Layout;

export const Route = createFileRoute('/_private')({
  component: PrivateLayout,
  beforeLoad: async ({ context }) => {
    if (!(await context.auth.isAuthenticated()))
      throw redirect({ to: '/sign-in' });
  },
});

function PrivateLayout() {
  return (
    <Layout className="h-screen">
      <Header />
      <Layout className="h-[calc(100%-48px)]">
        <Sidebar />
        <Layout>
          <Content className="overflow-y-auto">
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}
