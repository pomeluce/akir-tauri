import { RouteRecord } from 'react-router-dom';
import { RiDashboard3Line, RiFlowChart, RiSettings5Line } from '@remixicon/react';
import result from './result';

export default [
  {
    path: '/admin',
    component: lazy(() => import('@/layouts/admin')),
    meta: { auth: true, menu: { label: 'Dashboard', icon: RiDashboard3Line, order: 1 } },
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
  {
    path: '/admin/system',
    component: lazy(() => import('@/layouts/admin')),
    meta: { auth: true, menu: { label: '系统管理', icon: RiSettings5Line, order: 2 } },
    children: [
      {
        path: 'user',
        name: RouteName.SYSTEM_USER,
        meta: { menu: { label: '用户管理' } },
        component: lazy(() => import('@/views/admin')),
      },
      {
        path: 'role',
        name: RouteName.SYSTEM_ROLE,
        meta: { menu: { label: '角色管理' } },
        component: lazy(() => import('@/views/admin')),
      },
      {
        path: 'permission',
        name: RouteName.SYSTEM_PERMISSION,
        meta: { menu: { label: '权限管理' } },
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
    meta: { auth: true, menu: { label: '流程管理', icon: RiFlowChart, order: 3 } },
    children: [
      {
        path: 'define',
        name: RouteName.WORKFLOW_DEFINE,
        meta: { menu: { label: '流程定义' } },
        component: lazy(() => import('@/views/admin')),
      },
      {
        path: 'design',
        name: RouteName.WORKFLOW_DESIGN,
        meta: { menu: { label: '流程设计' } },
        component: lazy(() => import('@/views/admin')),
      },
    ],
  },
  ...result,
] as RouteRecord[];
