import { core } from '@tauri-apps/api';

export default () => {
  const defaultTheme = useStorage().get(CacheKey.THEME_MODE, 'system');

  const toggleTheme = (theme: ThemeType) => {
    core.invoke('plugin:theme|set_theme', { theme: theme === 'system' ? 'auto' : theme });
  };

  return { defaultTheme, toggleTheme };
};
