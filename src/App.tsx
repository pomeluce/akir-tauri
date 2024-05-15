import React from 'react';
import { RouterProvider } from 'react-router-dom';
import router from '@/plugins/router';

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
