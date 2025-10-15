import { createFileRoute } from '@tanstack/react-router';

import { SignInPage } from '~/auth/pages';

// Test credentials for demo
// const _TEST_CREDENTIALS = [
//   {
//     email: 'admin@example.com',
//     password: 'admin123',
//     role: 'admin',
//   },
//   {
//     email: 'user@example.com',
//     password: 'user123',
//     role: 'user',
//   },
// ];

export const Route = createFileRoute('/_auth/sign-in')({
  component: SignInPage,
});
