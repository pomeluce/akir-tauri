import React from 'react';
import { RouterProvider } from 'react-router-dom';
import router from '@/plugins/router';

const App: React.FC = () => {
  return (
    <RifyConfigProvider>
      <AntConfigProvider direction="ltr">
        <RouterProvider router={router}></RouterProvider>
      </AntConfigProvider>
    </RifyConfigProvider>
  );
};

export default App;
