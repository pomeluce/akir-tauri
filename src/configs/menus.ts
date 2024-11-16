import { event } from '@tauri-apps/api';

export const menus = [
  {
    title: '主页',
    icon: IconRiHome7Line,
    to: RouteTo.HOME,
    isActive: true,
  },
  {
    title: '设置',
    icon: IconRiSettings6Line,
    to: RouteTo.SETTINGS,
    isActive: false,
  },
];

export const showAbout = (callback: VoidFunction) => {
  event.listen('about', () => callback());
};
