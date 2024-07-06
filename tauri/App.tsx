import { RouterProvider } from '@common/plugins';
import { Container } from '@tauri/components';
import { router } from '@tauri/plugins';

const App: React.FC<{}> = () => {
  return (
    <ThemeProvider>
      <ArcoConfigProvider>
        <Container />
        <RouterProvider router={router} />
      </ArcoConfigProvider>
    </ThemeProvider>
  );
};

export default App;
