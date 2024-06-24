import { FC, ReactElement } from 'react';
import { IconType } from 'react-icons/lib';

declare module 'react-router-dom' {
  interface RouteMeta {
    auth?: boolean;
    guest?: boolean;
    label?: string;
    prefix?: boolean;
    icon?: IconType;
  }

  interface RouteRecord {
    path: string;
    component: () => Promise<{ default: FC<{}> }>;
    name: RouteRecordName;
    meta?: RouteMeta;
    children?: RouteRecord[];
  }

  interface RouteLocation {
    fullPath: string;
  }

  type Router = ReturnType<typeof createBrowserRouter>;

  type RouteParamValueRaw = string | number | null | undefined;

  type RouteParamsRaw = Record<string, RouteParamValueRaw>;

  type RouteRecordName = string;

  interface LocationAsRelativeRaw {
    name?: RouteRecordName;
    params?: RouteParamsRaw;
  }

  interface RouteLocationNamedRaw extends LocationAsRelativeRaw {}

  type RouteLocationRaw = string | RouteLocationNamedRaw;

  type NavigationGuardReturn = void | RouteLocationRaw | Error;

  interface MatcherLocation {
    name: RouteRecordName | null | undefined;
    path: string;
    params: RouteParamsRaw;
    meta: RouteMeta;
  }

  type RouterGuard = (to: MatcherLocation) => NavigationGuardReturn | Promise<NavigationGuardReturn>;
}
