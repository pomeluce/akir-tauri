import { event } from '@tauri-apps/api';
import { router } from '@tauri/plugins';

export default () => {
  const { setThemeMode } = useThemeStore();

  const listenStart = () => {
    event.listen('new', () => {
      console.log('menu action');
    });
    event.listen('settings', () => {
      router.navigator({ name: TauriRouteName.SETTINGS_STYLE });
    });

    event.listen('system_theme', () => setThemeMode('system'));
    event.listen('light_theme', () => setThemeMode('light'));
    event.listen('dark_theme', () => setThemeMode('dark'));
  };

  const showAbout = (callback: VoidFunction) => {
    event.listen('about', () => callback());
  };

  return { listenStart, showAbout };
};
