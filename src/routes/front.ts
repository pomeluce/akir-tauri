import { RouteRecord } from 'react-router-dom';

export default {
  path: '/',
  component: () => import('@/layouts/front'),
  meta: { auth: false },
  children: [
    {
      path: '',
      name: RouteName.HOME,
      component: () => import('@/views/front/home'),
    },
    {
      path: 'components',
      name: RouteName.COMPONENTS,
      component: () => import('@/views/front/components'),
    },
  ],
} as RouteRecord;
