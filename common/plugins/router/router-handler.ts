import { MatcherLocation, NavigationGuardReturn, RouteLocation, RouteLocationRaw, Router, RouteRecord, RouteRecordName, RouterGuard } from 'react-router-dom';

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

export class RouterHandler {
  root: Router;
  routes: RouteRecord[];
  routerGuard: RouterGuard | undefined;
  url = window.location.protocol + '//' + window.location.host;

  constructor(router: Router, records: RouteRecord[]) {
    this.root = router;
    this.routes = records;
  }

  /**
   * 设置路由全局守卫
   *
   * @param callback - 路由全局守卫
   */
  public beforeEach(callback: RouterGuard) {
    this.routerGuard = callback;
  }

  /* 当前路由对象 */
  public get record() {
    const route = this.matchPath(location.pathname);
    return { route, fullPath: this.url + this.resolve(route).fullPath };
  }

  /**
   * 根据路由获取 RouteLocation 对象
   *
   * @param route - 路由对象
   * @returns 返回一个 (route: RouteRecord) => RouteLocation 函数对象
   */
  public resolve = (route: RouteRecord): RouteLocation => {
    return { fullPath: getFullPath(this.routes, route?.name ?? '') };
  };

  /**
   * 根据路由名称获取路由对象
   *
   * @param name - 路由名称
   * @param routes - 路由对象集合
   * @returns 返回一个 (name: string | undefined, routes?: RouteRecord[]) => RouteRecord | undefined 函数对象
   */
  public matchName = (name: RouteRecordName | undefined, routes: RouteRecord[] = this.routes): RouteRecord => {
    const match = (name: RouteRecordName | undefined, routes: RouteRecord[]): RouteRecord | undefined => {
      let route = routes.find((route: RouteRecord) => route.name === name);
      if (route) return route;

      for (const { children } of routes) {
        if (children && (route = match(name, children))) return route;
      }
      return undefined;
    };

    let route = match(name, routes);
    if (route) return route;

    throw Error(`can not find route name: ${name}`);
  };

  /**
   * 根据路由路径获取路由对象
   *
   * @param path - 路由路径
   * @param routes - 路由对象集合
   * @returns 返回一个 (name: string | undefined, routes?: RouteRecord[]) => RouteRecord | undefined 函数对象
   */
  public matchPath = (path: string | undefined, routes: RouteRecord[] = this.routes): RouteRecord => {
    const match = (path: string | undefined, routes: RouteRecord[]): RouteRecord | undefined => {
      let route = routes.find((route: RouteRecord) => toRegex(this.resolve(route).fullPath).test(path || ''));
      if (route) return route;
      for (const { children } of routes) {
        if (children && (route = match(path, children))) return route;
      }
      return undefined;
    };

    let route = match(path, routes);
    if (route) return route;

    throw Error(`can not find route path: ${path}`);
  };

  /**
   * 路由导航函数
   *
   * @param to - 路由跳转信息
   */
  public navigator = (to: RouteLocationRaw) => {
    const routeTo = (to: RouteLocationRaw) => {
      if (typeof to === 'string') this.root.navigate(to);
      else {
        let path = this.resolve(this.matchName(to.name)).fullPath;
        path = path.replace(/:([^\/]+)/g, (_, key) => {
          // 如果参数存在于对象中，替换为对应值，否则保留原参数或使用默认值
          return to.params?.hasOwnProperty(key) ? (to.params[key] ? to.params[key].toString() : `:${key}`) : `:${key}`;
        });
        this.root.navigate(path);
      }
    };
    const handle = (r: NavigationGuardReturn) => {
      if (r instanceof Error) throw Error(r.message);
      routeTo(typeof r === 'object' ? r : to);
    };
    const route = typeof to === 'string' ? this.matchPath(to) : { ...this.matchName(to.name), params: to.params };
    if (this.routerGuard) {
      const guard = this.routerGuard(route as MatcherLocation);
      guard instanceof Promise ? guard.then(result => handle(result)) : handle(guard);
    } else routeTo(to);
  };
}
