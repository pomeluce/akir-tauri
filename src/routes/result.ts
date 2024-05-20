import { RouteRecord } from 'react-router-dom';
import { RiCheckboxCircleFill } from '@remixicon/react';

export default [
  {
    path: '/admin/result',
    component: lazy(() => import('@/layouts/admin')),
    meta: { auth: false, menu: { label: '结果页面', icon: RiCheckboxCircleFill, order: 3 } },
    children: [
      {
        path: 'info',
        name: RouteName.RESUALT_INFO,
        meta: { menu: { label: '信息页' } },
        component: lazy(() => import('@/views/result/info')),
      },
      {
        path: 'success',
        name: RouteName.RESUALT_SUCCESS,
        meta: { menu: { label: '成功页' } },
        component: lazy(() => import('@/views/result/success')),
      },
      {
        path: 'failed',
        name: RouteName.RESUALT_FAILED,
        meta: { menu: { label: '失败页' } },
        component: lazy(() => import('@/views/result/failed')),
      },
    ],
  },
] as RouteRecord[];
