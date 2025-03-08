import { event } from '@tauri-apps/api';
import { TbHome, TbSettings } from 'react-icons/tb';

export const menus = [
  {
    title: '主页',
    icon: TbHome,
    to: RouteTo.HOME,
    isActive: true,
  },
  {
    title: '设置',
    icon: TbSettings,
    to: RouteTo.SETTINGS,
    isActive: false,
  },
];

export const showAbout = (callback: VoidFunction) => {
  event.listen('about', () => callback());
};
