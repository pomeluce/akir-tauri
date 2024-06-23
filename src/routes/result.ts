import { RouteName } from '@/enum/RouteName';
import { RiDiscountPercentLine } from 'react-icons/ri';
import { RouteRecord } from 'react-router-dom';

export default [
  {
    path: '/admin/result',
    name: RouteName.MODULE_RESULT,
    component: () => import('@/layouts/admin'),
    meta: { auth: false, icon: RiDiscountPercentLine },
    children: [
      {
        path: 'info',
        name: RouteName.RESUALT_INFO,
        component: () => import('@/views/result/info'),
      },
      {
        path: 'success',
        name: RouteName.RESUALT_SUCCESS,
        component: () => import('@/views/result/success'),
      },
      {
        path: 'failed',
        name: RouteName.RESUALT_FAILED,
        component: () => import('@/views/result/failed'),
      },
    ],
  },
] as RouteRecord[];
