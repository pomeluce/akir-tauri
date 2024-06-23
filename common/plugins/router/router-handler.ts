import { RouteLocation, RouteLocationRaw, Router, RouteRecord, RouterGuard } from 'react-router-dom';

const getFullPath = (raws: RouteRecord[], name: string, path: string = ''): string => {
  for (const raw of raws) {
    const currentPath = `${path}${!!path && !!raw.path && !path.endsWith('/') ? '/' : ''}${raw.path}`;
    if (raw.name === name) return currentPath;
    if (raw.children) {
      const childrenPath = getFullPath(raw.children, name, `${currentPath}`);
      if (childrenPath && childrenPath !== '*') return childrenPath;
    }
  }
  return '*';
};

const toRegex = (path: string): RegExp => {
  const regex = path.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&').replace(/:[^\s/]+/g, '[^/]+');
  return new RegExp(`^${regex}\/?$`);
};

const handler = (router: Router, records: RouteRecord[], beforeEach?: RouterGuard) => {
  const url = window.location.protocol + '//' + window.location.host;

  /**
   * 根据路由获取 RouteLocation 对象
   *
   * @param route - 路由对象
   * @returns 返回一个 (route: RouteRecord) => RouteLocation 函数对象
   */
  const resolve = (route: RouteRecord): RouteLocation => {
    return { fullPath: getFullPath(records, route?.name ?? '') };
  };

  /**
   * 根据路由名称获取路由对象
   *
   * @param name - 路由名称
   * @param routes - 路由对象集合
   * @returns 返回一个 (name: string | undefined, routes?: RouteRecord[]) => RouteRecord | undefined 函数对象
   */
  const matchName = (name: string | undefined, routes: RouteRecord[] = records): RouteRecord | undefined => {
    let route = routes.find((route: RouteRecord) => route.name === name);
    if (route) return route;

    for (const { children } of routes) {
      if (children && (route = matchName(name, children))) return route;
    }
    return undefined;
  };

  /**
   * 根据路由路径获取路由对象
   *
   * @param path - 路由路径
   * @param routes - 路由对象集合
   * @returns 返回一个 (name: string | undefined, routes?: RouteRecord[]) => RouteRecord | undefined 函数对象
   */
  const matchPath = (path: string | undefined, routes: RouteRecord[] = records): RouteRecord | undefined => {
    let route = routes.find((route: RouteRecord) => toRegex(resolve(route).fullPath).test(path || ''));
    if (route) return route;
    for (const { children } of routes) {
      if (children && (route = matchPath(path, children))) return route;
    }
    return undefined;
  };

  /* 当前路由对象 */
  const context = matchPath(location.pathname);

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
    if (typeof to === 'string') {
      beforeEach
        ? beforeEach(matchPath(to)).then(auth => {
            auth && router.navigate(to);
          })
        : router.navigate(to);
    } else {
      const route = matchName(to.name);
      beforeEach
        ? beforeEach(route).then(auth => {
            auth && router.navigate(resolve(route!).fullPath);
          })
        : router.navigate(resolve(route!).fullPath);
    }
  };

  return { root: router, beforeEach, context, fullPath, matchName, matchPath, open, navigator, resolve };
};

export default handler;
export type RouterHandlerType = ReturnType<typeof handler>;
