import { RouterDevtools } from '@/components';
import { Leftbar } from './-root';
import { About, Pushpin } from '@/components';

export const Route = createRootRoute({
  component: () => {
    const { registerKey } = useAppKeyStore();

    useEffect(() => {
      // 注册全局快捷键
      registerKey();
    }, []);

    return (
      <>
        <main className="w-screen h-screen flex select-none">
          <Leftbar />
          <main className="grow-1 grid grid-rows-[auto_1fr] gap-3 bg-backdrop2/80 border-l border-rim2 overflow-hidden">
            <div data-tauri-drag-region className="w-full flex items-center gap-7 p-2 border-b border-rim2">
              <main className="flex items-center gap-3 ml-auto text-word2">
                <Pushpin />
                <About />
              </main>
            </div>
            <main className="grid overflow-auto">
              <Outlet />
            </main>
          </main>
        </main>
        <RouterDevtools />
      </>
    );
  },
});
