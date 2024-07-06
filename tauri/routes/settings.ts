import { RouteRecord } from 'react-router-dom';

export default {
  path: '/setting',
  component: () => import('@tauri/layouts'),
  children: [
    {
      path: '',
      name: TauriRouteName.SETTING,
      component: () => import('@tauri/views/setting'),
    },
  ],
} as RouteRecord;
