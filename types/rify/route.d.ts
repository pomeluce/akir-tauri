import { ReactElement } from 'react';
import { IIconProps } from '@icon-park/react/lib/runtime';

declare module 'react-router-dom' {
  interface RouteMeta {
    auth?: boolean;
    guest?: boolean;
    label?: string;
    prefix?: boolean;
  }

  interface RouteRecord {
    path: string;
    component: React.LazyExoticComponent;
    name?: string;
    meta?: RouteMeta;
    children?: RouteRecord[];
  }

  interface RouteLocation {
    fullPath: string;
  }

  type RouteLocationRaw = string | RouteLocationNamedRaw;

  interface RouteLocationNamedRaw extends LocationAsRelativeRaw {}

  interface LocationAsRelativeRaw {
    name?: string;
    params?: RouteParamsRaw;
  }

  type RouteParamsRaw = Record<string, RouteParamValueRaw>;

  type RouteParamValueRaw = string | number | null | undefined;
}
