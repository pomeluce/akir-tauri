import React from 'react';
import { RouterProvider } from 'react-router-dom';
import router from '@/plugins/router';

const App: React.FC = () => {
  return (
    <AntConfigProvider direction="ltr">
      <RouterProvider router={router}></RouterProvider>
    </AntConfigProvider>
  );
};

export default App;
