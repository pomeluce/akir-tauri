import { DashboardOne } from '@icon-park/react';
import { RouteRecord } from 'react-router-dom';
import result from './result';

export default [
  {
    path: '/admin',
    component: lazy(() => import('@/layouts/admin')),
    meta: { auth: false, menu: { label: 'Dashboard', icon: DashboardOne, order: 1 } },
    children: [
      {
        path: '',
        name: RouteName.ADMIN,
        meta: { menu: { label: '主控台' } },
        component: lazy(() => import('@/views/admin')),
      },
      {
        path: 'workbench',
        name: RouteName.WORKBENCH,
        meta: { menu: { label: '工作台' } },
        component: lazy(() => import('@/views/admin')),
      },
    ],
  },
  ...result,
] as RouteRecord[];
