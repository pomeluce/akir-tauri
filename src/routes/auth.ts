import { RouteRecord } from 'react-router-dom';

export default {
  path: '/auth',
  component: () => import('@/layouts/auth'),
  meta: { guest: true },
  children: [
    {
      path: 'login',
      name: RouteName.LOGIN,
      component: () => import('@/views/auth/login'),
    },
    {
      path: 'register',
      name: RouteName.REGISTER,
      component: () => import('@/views/auth/register'),
    },
  ],
} as RouteRecord;
