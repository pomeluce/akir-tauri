import { RouteRecord } from 'react-router-dom';

export default {
  path: '/',
  component: lazy(() => import('@/layouts/front')),
  meta: { auth: false },
  children: [
    {
      path: '',
      name: RouteName.HOME,
      component: lazy(() => import('@/views/front/home')),
    },
    {
      path: 'components',
      name: RouteName.COMPONENTS,
      component: lazy(() => import('@/views/front/components')),
    },
  ],
} as RouteRecord;
