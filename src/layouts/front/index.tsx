import Topbar from '@/layouts/front/topbar';
import { ProtectedRouter } from '@common/plugins';

const front: React.FC<{}> = () => {
  return (
    <ProtectedRouter>
      <main>
        <Topbar />
        <main className="w-full 2xl:w-page mx-auto p-3 mt-5">
          <Outlet />
        </main>
      </main>
    </ProtectedRouter>
  );
};

export default front;
