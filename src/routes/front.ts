import { RouteRecord } from 'react-router-dom';

export default {
  path: '/',
  component: lazy(() => import('@/layouts/front')),
  children: [
    {
      path: '',
      name: RouteName.HOME,
      component: lazy(() => import('@/views/front/home')),
    },
  ],
} as RouteRecord;
