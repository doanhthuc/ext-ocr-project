import { createFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/_private/translate/history')({
  component: Outlet,
});
