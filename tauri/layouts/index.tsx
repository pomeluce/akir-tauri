import Leftbar from './leftbar';

const app: React.FC<{}> = () => {
  return (
    <main className="w-screen h-screen grid grid-cols-[auto_1fr] px-5 gap-5">
      <Leftbar />
      <main className="grid py-5 overflow-hidden">
        <Outlet />
      </main>
    </main>
  );
};

export default app;
