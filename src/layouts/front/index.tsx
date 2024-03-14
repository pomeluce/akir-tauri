import Topbar from '@/layouts/front/topbar';

const front: React.FC<{}> = () => {
  return (
    <main>
      <Topbar />
      <main className="w-full 2xl:w-page mx-auto p-3 mt-5">
        <Outlet />
      </main>
    </main>
  );
};

export default front;
