import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { IAuth } from '@/hooks/useAuth';

const RouterDevtools = __DEV__ ? TanStackRouterDevtools : () => null;

export const Route = createRootRouteWithContext<{ auth: IAuth }>()({
  beforeLoad: ctx => useAppGuard(ctx),
  component: () => (
    <>
      <Outlet />
      <RouterDevtools />
    </>
  ),
});
