import { RouterProvider } from '@common/plugins';
import { router } from '@tauri/plugins';
import PopupContainer from '@tauri/layouts/popup-container';

const App: React.FC<{}> = () => {
  return (
    <ArcoConfigProvider>
      <PopupContainer />
      <RouterProvider router={router} />
    </ArcoConfigProvider>
  );
};

export default App;
