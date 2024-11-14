import { RouterDevtools } from '@common/components';
import { IAuth } from '@main/hooks/useAuth';

export const Route = createRootRouteWithContext<{ auth: IAuth }>()({
  beforeLoad: ctx => useRouterGuard(ctx),
  component: () => (
    <>
      <Outlet />
      <RouterDevtools />
    </>
  ),
});
