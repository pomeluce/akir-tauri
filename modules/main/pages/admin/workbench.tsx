import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/admin/workbench')({
  component: () => <div>Hello /admin/workbench!</div>,
});
