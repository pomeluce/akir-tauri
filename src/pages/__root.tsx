import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { AxiosError } from 'axios';
import { IAuth } from '@/hooks/useAuth';

const { handleAxiosError } = useUtils();

const RouterDevtools = __DEV__ ? TanStackRouterDevtools : () => null;

export const Route = createRootRouteWithContext<{ auth: IAuth }>()({
  beforeLoad: async ({ context }) => {
    const { isAuthenticated, initial, setInitial } = context.auth;
    if (!initial() && isAuthenticated())
      try {
        setInitial(true);
        await Promise.all([useUserStore.getState().getCurrentUser(), useMenuStore.getState().getMenuList()]);
      } catch (e) {
        handleAxiosError(e as AxiosError);
      }
  },
  component: () => (
    <>
      <Outlet />
      <RouterDevtools />
    </>
  ),
});
