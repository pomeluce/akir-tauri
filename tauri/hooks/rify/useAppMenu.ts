import { router } from '@tauri/plugins';
import { event, core } from '@tauri-apps/api';

export default () => {
  const { theme, setTheme } = useTheme();

  const menus = [
    {
      title: '主页',
      icon: IconRiHome7Line({ size: 32 }),
      handleClick: () => {
        router.navigator({ name: TauriRouteName.HOME });
      },
      isActive: router.record().route.name === TauriRouteName.HOME,
    },
    {
      title: '设置',
      icon: IconRiSettings6Line({ size: 32 }),
      handleClick: () => {
        router.navigator({ name: TauriRouteName.SETTING });
      },
      isActive: router.record().route.name === TauriRouteName.SETTING,
    },
  ];

  const changeTheme = (key: string, theme: ThemeType) => {
    event.listen(key, () => {
      event.emit('current_theme', theme);
      setTheme(theme);
      core.invoke('plugin:theme|set_theme', { theme: theme === 'system' ? 'auto' : theme });
    });
  };

  const initialMenu = () => {
    event.emit('current_theme', theme);
  };

  const showAbout = (callback: VoidFunction) => {
    event.listen('about', () => callback());
  };

  return { changeTheme, initialMenu, menus, showAbout };
};
