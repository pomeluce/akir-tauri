import { RouteRecord } from 'react-router-dom';

export default [
  {
    path: '/admin/result',
    component: lazy(() => import('@/layouts/admin')),
    meta: { auth: false },
    children: [
      {
        path: 'info',
        name: RouteName.RESUALT_INFO,
        component: lazy(() => import('@/views/result/info')),
      },
      {
        path: 'success',
        name: RouteName.RESUALT_SUCCESS,
        component: lazy(() => import('@/views/result/success')),
      },
      {
        path: 'failed',
        name: RouteName.RESUALT_FAILED,
        component: lazy(() => import('@/views/result/failed')),
      },
    ],
  },
] as RouteRecord[];
