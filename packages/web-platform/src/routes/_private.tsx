import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';
import { Layout } from 'antd';

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
      <Sidebar />
      <Layout
        style={{
          background: 'linear-gradient(180deg, #000C25 0%, #0049DA 100%)',
        }}
        className="p-4"
      >
        <Content className="bg-white rounded-[24px] overflow-hidden h-full">
          <div className="h-full overflow-y-auto">
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}
