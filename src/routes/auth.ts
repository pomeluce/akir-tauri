import { RouteRecord } from 'react-router-dom';

export default {
  path: '/auth',
  component: lazy(() => import('@/layouts/auth')),
  meta: { guest: true },
  children: [
    {
      path: 'login',
      name: RouteName.LOGIN,
      component: lazy(() => import('@/views/auth/login')),
    },
    {
      path: 'register',
      name: RouteName.REGISTER,
      component: lazy(() => import('@/views/auth/register')),
    },
  ],
} as RouteRecord;
