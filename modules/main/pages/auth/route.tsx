import { WithSuspense } from '@common/components';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/auth')({
  beforeLoad: ctx => useRouterGuard(ctx, { guest: true }),
  component: () => (
    <WithSuspense>
      <main className="w-screen h-screen flex justify-center items-center px-5 bg-[url('@main/assets/images/auth-bg.svg')]">
        <Outlet />
      </main>
    </WithSuspense>
  ),
});
