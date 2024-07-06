import { RouteRecord } from 'react-router-dom';

export default {
  path: '/',
  component: () => import('@tauri/layouts'),
  children: [
    {
      path: '',
      name: TauriRouteName.HOME,
      component: () => import('@tauri/views/home'),
    },
  ],
} as RouteRecord;
