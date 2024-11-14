import { event } from '@tauri-apps/api';

export const menus = [
  {
    title: '主页',
    icon: IconRiHome7Line,
    to: RouteTo.Tauri.HOME,
    isActive: true,
  },
  {
    title: '设置',
    icon: IconRiSettings6Line,
    to: RouteTo.Tauri.SETTINGS,
    isActive: false,
  },
];

export const showAbout = (callback: VoidFunction) => {
  event.listen('about', () => callback());
};
