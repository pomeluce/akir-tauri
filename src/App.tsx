import React from 'react';
import { RouterProvider } from 'react-router-dom';
import router from '@/plugins/router';

const App: React.FC = () => {
  const { rifyTheme } = useThemeStore();

  return (
    <RifyConfigProvider theme={rifyTheme} direction={'ltr'}>
      <ArcoConfigProvider>
        <RouterProvider router={router}></RouterProvider>
      </ArcoConfigProvider>
    </RifyConfigProvider>
  );
};

export default App;
