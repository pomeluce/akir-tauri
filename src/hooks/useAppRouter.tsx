import { ParsedLocation } from '@tanstack/react-router';
import { AxiosError } from 'axios';
import { E404, E500 } from '@/components';
import { routeTree } from '@/routeTree.gen';
import { IAuth } from './useAuth';

export const router = createRouter({
  routeTree,
  context: { auth: undefined! },
  defaultNotFoundComponent: E404,
  defaultErrorComponent: E500,
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export const useAppRouter = () => {
  const auth = useAuth();
  const AppRouterProvider = () => {
    return <RouterProvider router={router} context={{ auth }} />;
  };

  return { AppRouterProvider };
};

/**
 * 路由守卫: 拦截路由, 进行鉴权处理
 *
 * @param ctx - 路由上下文信息
 * @param meta - 路由标志
 */
export const useAppGuard = async ({ context: { auth }, location }: any, meta?: RouteMeta) => {
  const { isAuthenticated, initial, setInitial } = auth as IAuth;
  const { href } = location as ParsedLocation;
  const { handleAxiosError } = useUtils();
  const { set } = useStorage();

  // 初始化
  if (!initial())
    try {
      setInitial(true);
      await Promise.all([useUserStore.getState().getCurrentUser(), useMenuStore.getState().getMenuList()]);
    } catch (e) {
      handleAxiosError(e as AxiosError);
    }

  // 保护内容需要登录验证
  if (meta?.auth && !isAuthenticated()) {
    set(CacheKey.REDIRECT_ROUTE_NAME, href);
    throw redirect({ to: RouteTo.LOGIN });
  }

  // 认证页面, 已登录跳转到首页
  if (meta?.guest && isAuthenticated()) throw redirect({ to: RouteTo.HOME });

  // 登录页面, 重置初始化信息
  if (meta?.loginView) setInitial(false);
};
