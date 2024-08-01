import { RouterProvider } from '@common/plugins';
import { router } from '@tauri/plugins';

const App: React.FC<{}> = () => {
  const { defaultTheme, toggleTheme } = useAppTheme();

  return (
    <ThemeProvider defaultTheme={defaultTheme} handleToggle={toggleTheme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
};

export default App;
