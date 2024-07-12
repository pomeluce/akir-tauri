import { RouterProvider } from '@common/plugins';
import { router } from '@tauri/plugins';

const App: React.FC<{}> = () => {
  const { toggleTheme } = useAppTheme();

  return (
    <ThemeProvider handleToggle={toggleTheme}>
      <ArcoConfigProvider>
        <RouterProvider router={router} />
      </ArcoConfigProvider>
    </ThemeProvider>
  );
};

export default App;
