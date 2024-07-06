import React from 'react';
import { RouterProvider } from '@common/plugins';
import { router } from '@/plugins';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <ArcoConfigProvider>
        <RouterProvider router={router}></RouterProvider>
      </ArcoConfigProvider>
    </ThemeProvider>
  );
};

export default App;
