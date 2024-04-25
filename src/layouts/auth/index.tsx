import { ProtectedRouter } from '@/plugins';

const auth: React.FC<{}> = () => {
  return (
    <ProtectedRouter>
      <main className="w-screen h-screen">
        <Outlet />
      </main>
    </ProtectedRouter>
  );
};

export default auth;
