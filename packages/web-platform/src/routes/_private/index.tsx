import { createFileRoute, Navigate } from '@tanstack/react-router';

export const Route = createFileRoute('/_private/')({
  component: HomePage,
});

function HomePage() {
  return <Navigate to="/dashboard" replace />;
}
