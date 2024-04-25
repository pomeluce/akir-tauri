import { RouteRecord } from 'react-router-dom';
import front from './front';
import auth from './auth';
import admin from './admin';
import error from './error';

const unknown: RouteRecord = {
  path: '*',
  name: RouteName.UNKNOWN,
  component: lazy(() => import('@/views/error/404')),
};

const resolver = (route: RouteRecord) => {
  if (!route.meta || !route.children) return route;
  const meta = route.meta;

  route.children.map(item => {
    if (!item.meta || item.meta.auth === undefined) item.meta = { auth: meta.auth };
    if (route.children) resolver(item);
  });

  return route;
};

export default [front, auth, ...admin, error, unknown].map(item => resolver(item)) as RouteRecord[];

export const ErrorElement = lazy(() => import('@/views/error/500'));
