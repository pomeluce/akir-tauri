import { ProtectedRouter } from '@common/plugins';

const auth: React.FC<{}> = () => {
  return (
    <ProtectedRouter>
      <main className="w-screen h-screen flex justify-center items-center px-5 bg-[url('/src/assets/images/auth-bg.svg')]">
        <Outlet />
      </main>
    </ProtectedRouter>
  );
};

export default auth;
