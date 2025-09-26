import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/_auth')({
  component: AuthLayout,
  beforeLoad: async ({ context }) => {
    if (await context.auth.isAuthenticated())
      throw redirect({ to: '/dashboard' });
  },
});

function AuthLayout() {
  return <Outlet />;
}
