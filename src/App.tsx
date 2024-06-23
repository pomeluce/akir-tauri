import React from 'react';
import { RouterProvider } from '@common/plugins';
import { router } from '@/plugins';

const App: React.FC = () => {
  const { theme, setTheme } = useThemeStore();

  useEffect(() => {
    setTheme(theme);
  }, []);

  return (
    <ArcoConfigProvider>
      <RouterProvider router={router}></RouterProvider>
    </ArcoConfigProvider>
  );
};

export default App;
