import Titlebar from './titlebar';
import Leftbar from './leftbar';

const app: React.FC<{}> = () => {
  return (
    <main className="w-screen h-screen min-w-3xl min-h-xl flex flex-col">
      <Titlebar />
      <main className="grow-1 grid grid-cols-[auto_1fr] px-3 gap-3 overflow-hidden">
        <Leftbar />
        <main className="grid py-3 overflow-auto">
          <Outlet />
        </main>
      </main>
    </main>
  );
};

export default app;
