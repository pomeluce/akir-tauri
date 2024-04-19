import React from 'react';
import { RouterProvider } from 'react-router-dom';
import router from '@/plugins/router';
import MessageProvider from './rify/message/src/message-context';

const App: React.FC = () => {
  const { rifyTheme } = useThemeStore();

  return (
    <RifyConfigProvider theme={rifyTheme} direction={'ltr'}>
      <MessageProvider>
        <AntConfigProvider direction="ltr">
          <RouterProvider router={router}></RouterProvider>
        </AntConfigProvider>
      </MessageProvider>
    </RifyConfigProvider>
  );
};

export default App;
