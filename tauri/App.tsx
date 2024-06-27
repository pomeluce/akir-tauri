import { RouterProvider } from '@common/plugins';
import { router } from '@tauri/plugins';
import Container from '@tauri/components/container';

const App: React.FC<{}> = () => {
  const { listenerColorMode, colorScheme } = useTheme();
  useEffect(colorScheme(listenerColorMode), [listenerColorMode]);

  return (
    <ArcoConfigProvider>
      <Container />
      <RouterProvider router={router} />
    </ArcoConfigProvider>
  );
};

export default App;
