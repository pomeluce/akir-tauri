import { RouterProvider } from '@common/plugins';
import { router } from '@tauri/plugins';
import Container from '@tauri/layouts/container';

const App: React.FC<{}> = () => {
  return (
    <ArcoConfigProvider>
      <Container />
      <RouterProvider router={router} />
    </ArcoConfigProvider>
  );
};

export default App;
