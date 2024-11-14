import { RouterDevtools } from '@common/components';
import { IAuth } from '@/hooks/useAuth';

export const Route = createRootRouteWithContext<{ auth: IAuth }>()({
  beforeLoad: ctx => useAppGuard(ctx),
  component: () => (
    <>
      <Outlet />
      <RouterDevtools />
    </>
  ),
});
