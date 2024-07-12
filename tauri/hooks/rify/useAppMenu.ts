import { event } from '@tauri-apps/api';
import { router } from '@tauri/plugins';

export default () => {
  const menus = [
    {
      title: '主页',
      icon: IconRiHome7Line({}),
      handleClick: () => {
        router.navigator({ name: TauriRouteName.HOME });
      },
      isActive: router.record().route.name === TauriRouteName.HOME,
    },
    {
      title: '设置',
      icon: IconRiSettings6Line({}),
      handleClick: () => {
        router.navigator({ name: TauriRouteName.SETTING });
      },
      isActive: router.record().route.name === TauriRouteName.SETTING,
    },
  ];

  const showAbout = (callback: VoidFunction) => {
    event.listen('about', () => callback());
  };

  return { menus, showAbout };
};
