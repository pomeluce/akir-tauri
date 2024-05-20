import { RouteRecord } from 'react-router-dom';
import { RiDashboardFill } from '@remixicon/react';
import result from './result';

export default [
  {
    path: '/admin',
    component: lazy(() => import('@/layouts/admin')),
    meta: { auth: true, menu: { label: 'Dashboard', icon: RiDashboardFill, order: 1 } },
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
