import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';

import { useAuth } from '~/auth/hooks/useAuth';
import { NotFound } from '~shared/components/NotFound';
import { useNotification } from '~shared/hooks/useNotification';

type RouterContext = {
  auth: ReturnType<typeof useAuth>;
  notification: ReturnType<typeof useNotification>;
};

export const Route = createRootRouteWithContext<RouterContext>()({
  component: Root,
  notFoundComponent: () => <NotFound />,
});

export function Root() {
  return <Outlet />;
}
