import Leftbar from './leftbar';

const app: React.FC<{}> = () => {
  return (
    <main className="w-screen h-screen bg-backdrop2 grid grid-cols-[auto_1fr]">
      <Leftbar />
      <Outlet />
    </main>
  );
};

export default app;
