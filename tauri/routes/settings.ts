import { RouteRecord } from 'react-router-dom';

export default {
  path: '/settings',
  component: () => import('@tauri/layouts/settings'),
  children: [
    {
      path: 'style',
      name: TauriRouteName.SETTINGS_STYLE,
      component: () => import('@tauri/views/settings/style'),
    },
  ],
} as RouteRecord;
