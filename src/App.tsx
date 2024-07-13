import React from 'react';
import { RouterProvider } from '@common/plugins';
import { router } from '@/plugins';

const App: React.FC = () => {
  const storage = useStorage();
  const themeMode = storage.get(CacheKey.THEME_MODE, 'system');
  const themeHandle = (theme: ThemeType) => {
    storage.set(CacheKey.THEME_MODE, theme);
  };

  return (
    <ThemeProvider defaultTheme={themeMode} handleToggle={themeHandle}>
      <ArcoConfigProvider>
        <RouterProvider router={router}></RouterProvider>
      </ArcoConfigProvider>
    </ThemeProvider>
  );
};

export default App;
