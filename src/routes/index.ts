import { RouteRecord } from 'react-router-dom';
import front from '@/routes/front';
import admin from '@/routes/admin';
import error from '@/routes/error';

const unknown: RouteRecord = {
  path: '*',
  name: 'unknown',
  component: lazy(() => import('@/views/error/404')),
};

export default [front, ...admin, error, unknown] as RouteRecord[];

export const ErrorElement = lazy(() => import('@/views/error/500'));
