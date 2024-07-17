import Titlebar from './titlebar';
import Leftbar from './leftbar';

const app: React.FC<{}> = () => {
  const { registerKey } = useAppKeyStore();

  useEffect(() => {
    // 注册全局快捷键
    registerKey();
  }, []);

  return (
    <main className="w-screen h-screen flex select-none">
      <Leftbar />
      <main className="grow-1 grid grid-rows-[auto_1fr] gap-3 bg-backdrop2 overflow-hidden">
        <Titlebar />
        <main className="grid overflow-auto">
          <Outlet />
        </main>
      </main>
    </main>
  );
};

export default app;
