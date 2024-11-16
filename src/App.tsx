import { core } from '@tauri-apps/api';
import { router } from '@/plugins';

const App: React.FC<{}> = () => {
  const storage = useStorage();
  const defaultTheme = storage.get(CacheKey.THEME_MODE, 'system');
  const toggleTheme = (theme: ThemeType) => {
    core.invoke('plugin:theme|set_theme', { theme: theme === 'system' ? 'auto' : theme });
    storage.set(CacheKey.THEME_MODE, theme);
  };

  return (
    <ThemeProvider defaultTheme={defaultTheme} handleToggle={toggleTheme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
};

export default App;
