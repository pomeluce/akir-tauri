import { RouterProvider } from '@common/plugins';
import { router } from '@tauri/plugins';

const App: React.FC<{}> = () => {
  const { defaultTheme, toggleTheme } = useAppTheme();

  return (
    <ThemeProvider defaultTheme={defaultTheme} handleToggle={toggleTheme}>
      <ArcoConfigProvider>
        <RouterProvider router={router} />
      </ArcoConfigProvider>
    </ThemeProvider>
  );
};

export default App;
