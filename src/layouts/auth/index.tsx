import { ProtectedRouter } from '@/plugins';

const auth: React.FC<{}> = () => {
  return (
    <ProtectedRouter>
      <main className="w-screen h-screen flex justify-center items-center px-5">
        <Outlet />
      </main>
    </ProtectedRouter>
  );
};

export default auth;
