import { RouteRecord } from 'react-router-dom';
import result from './result';

export default [
  {
    path: '/admin',
    component: lazy(() => import('@/layouts/admin')),
    meta: { auth: true },
    children: [
      {
        path: '',
        name: RouteName.ADMIN,
        component: lazy(() => import('@/views/admin')),
      },
      {
        path: 'workbench',
        name: RouteName.WORKBENCH,
        component: lazy(() => import('@/views/admin')),
      },
    ],
  },
  {
    path: '/admin/system',
    component: lazy(() => import('@/layouts/admin')),
    meta: { auth: true },
    children: [
      {
        path: 'user',
        name: RouteName.SYSTEM_USER,
        component: lazy(() => import('@/views/admin')),
      },
      {
        path: 'role',
        name: RouteName.SYSTEM_ROLE,
        component: lazy(() => import('@/views/admin')),
      },
      {
        path: 'permission',
        name: RouteName.SYSTEM_PERMISSION,
        component: lazy(() => import('@/views/admin')),
      },
      {
        path: 'menu',
        name: RouteName.SYSTEM_MENU,
        meta: { menu: { label: '菜单管理' } },
        component: lazy(() => import('@/views/admin')),
      },
    ],
  },
  {
    path: '/admin/workflow',
    component: lazy(() => import('@/layouts/admin')),
    meta: { auth: true },
    children: [
      {
        path: 'define',
        name: RouteName.WORKFLOW_DEFINE,
        component: lazy(() => import('@/views/admin')),
      },
      {
        path: 'design',
        name: RouteName.WORKFLOW_DESIGN,
        component: lazy(() => import('@/views/admin')),
      },
    ],
  },
  ...result,
] as RouteRecord[];
