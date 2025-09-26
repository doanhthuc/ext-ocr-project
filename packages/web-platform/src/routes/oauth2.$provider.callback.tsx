import { createFileRoute, redirect } from '@tanstack/react-router';

import { AuthProvider } from '~/auth/types/auth.type';

export const Route = createFileRoute('/oauth2/$provider/callback')({
  component: RouteComponent,
  validateSearch: search => ({
    code: String(search.code),
  }),
  beforeLoad: async ({ context, params, search }) => {
    const { provider } = params;
    const { code } = search;
    const { auth } = context;
    const user = await auth.signIn({
      provider: provider as AuthProvider,
      code,
    });
    throw redirect({ to: user ? '/' : '/sign-in' });
  },
});

function RouteComponent() {
  return null;
}
