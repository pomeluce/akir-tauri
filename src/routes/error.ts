import { RiToolsFill } from 'react-icons/ri';
import { RouteRecord } from 'react-router-dom';

export default {
  path: '/error',
  name: RouteName.MODULE_ERROR,
  component: lazy(() => import('@/layouts/error')),
  meta: { auth: false, icon: RiToolsFill },
  children: [
    {
      path: '403',
      name: RouteName.ERROR_403,
      component: lazy(() => import('@/views/error/403')),
    },
    {
      path: '404',
      name: RouteName.ERROR_404,
      component: lazy(() => import('@/views/error/404')),
    },
    {
      path: '500',
      name: RouteName.ERROR_500,
      component: lazy(() => import('@/views/error/500')),
    },
  ],
} as RouteRecord;
