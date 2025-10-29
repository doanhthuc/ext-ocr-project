import { createFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/_private/translate')({
  component: Outlet,
});
