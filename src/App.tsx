import React from 'react';
import { RouterProvider } from '@common/plugins';
import { router } from '@/plugins';

const App: React.FC = () => {
  const { listenerColorMode, colorScheme } = useTheme();
  useEffect(colorScheme(listenerColorMode), [listenerColorMode]);

  return (
    <ArcoConfigProvider>
      <RouterProvider router={router}></RouterProvider>
    </ArcoConfigProvider>
  );
};

export default App;
