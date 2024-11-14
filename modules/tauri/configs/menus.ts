import { event } from '@tauri-apps/api';
import { router } from '@tauri/plugins';

export const menus = [
  {
    title: '主页',
    icon: IconRiHome7Line,
    handleClick: () => {
      router.navigate({ to: TauriRouteTo.HOME });
    },
    isActive: true,
  },
  {
    title: '设置',
    icon: IconRiSettings6Line,
    handleClick: () => {
      router.navigate({ to: TauriRouteTo.SETTINGS });
    },
    isActive: false,
  },
];

export const showAbout = (callback: VoidFunction) => {
  event.listen('about', () => callback());
};
