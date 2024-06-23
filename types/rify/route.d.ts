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
    name?: string;
    meta?: RouteMeta;
    children?: RouteRecord[];
  }

  interface RouteLocation {
    fullPath: string;
  }

  type RouterGuard = (to: RouteRecord | undefined) => Promise<boolean>;

  type Router = ReturnType<typeof createBrowserRouter>;

  type RouteLocationRaw = string | RouteLocationNamedRaw;

  interface RouteLocationNamedRaw extends LocationAsRelativeRaw {}

  interface LocationAsRelativeRaw {
    name?: string;
    params?: RouteParamsRaw;
  }

  type RouteParamsRaw = Record<string, RouteParamValueRaw>;

  type RouteParamValueRaw = string | number | null | undefined;
}
