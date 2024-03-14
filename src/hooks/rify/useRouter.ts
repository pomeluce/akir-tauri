import { RouteLocation, RouteLocationRaw, RouteRecord, matchRoutes } from 'react-router-dom';
import { routes } from '@/layouts';
import records from '@/routes';

const getFullPath = (raws: RouteRecord[], name: string, path: string = ''): string => {
  for (const raw of raws) {
    const currentPath = `${path}${!!path && !!raw.path && !path.endsWith('/') ? '/' : ''}${raw.path}`;
    if (raw.name === name) return currentPath;
    if (raw.children) {
      const childrenPath = getFullPath(raw.children, name, `${currentPath}`);
      if (childrenPath && childrenPath !== RoutePath.UNKNOWN) return childrenPath;
    }
  }
  return RoutePath.UNKNOWN;
};

export default () => {
  const { id } = matchRoutes(routes, useLocation())?.find(({ route }) => !!route.id)?.route!;
  const url = window.location.protocol + '//' + window.location.host;

  const navigate = useNavigate();

  /**
   * 根据路由名称获取路由对象
   *
   * @param name - 路由名称
   * @param routes - 路由对象集合
   * @returns 返回一个 (name: string | undefined, routes?: RouteRecord[]) => RouteRecord | undefined 函数对象
   */
  const matchRoute = (name: string | undefined, routes: RouteRecord[] = records): RouteRecord | undefined => {
    let route = routes.find((route: RouteRecord) => route.name === name);
    if (route) return route;

    for (const { children } of routes) {
      if (children && (route = matchRoute(name, children))) return route;
    }
    return undefined;
  };

  /* 当前路由对象 */
  const context = matchRoute(id);
  /**
   * 根据路由获取 RouteLocation 对象
   *
   * @param route - 路由对象
   * @returns 返回一个 (route: RouteRecord) => RouteLocation 函数对象
   */
  const resolve = (route: RouteRecord): RouteLocation => {
    return { fullPath: getFullPath(records, route.name ?? RouteName.UNKNOWN) };
  };

  /* 当前路由地址 */
  const fullPath = url + resolve(context!).fullPath;

  /**
   * 路由跳转函数
   *
   * @param route - 路由对象
   * @param target - 跳转方式, 默认为 _self
   */
  const open = (route: RouteRecord, target: string = '_self') => {
    const path = resolve(route).fullPath;
    target === '_blank' ? window.open(path) : (location.href = path);
  };

  /**
   * 路由导航函数
   *
   * @param to - 路由跳转信息
   */
  const navigator = (to: RouteLocationRaw) => {
    if (typeof to === 'string') navigate(to);
    else navigate(resolve(matchRoute(to.name)!).fullPath);
  };

  return { context, fullPath, matchRoute, open, navigator, resolve };
};
