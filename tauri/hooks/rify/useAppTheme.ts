import { core } from '@tauri-apps/api';

const storage = useStorage();
export default () => {
  const defaultTheme = storage.get(CacheKey.THEME_MODE, 'system');

  const toggleTheme = (theme: ThemeType) => {
    core.invoke('plugin:theme|set_theme', { theme: theme === 'system' ? 'auto' : theme });
    storage.set(CacheKey.THEME_MODE, theme);
  };

  return { defaultTheme, toggleTheme };
};
