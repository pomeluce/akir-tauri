import Leftbar from '@/layouts/admin/leftbar';
import Topbar from '@/layouts/admin/topbar';
import { ProtectedRouter } from '@common/plugins';

const admin: React.FC<{}> = () => {
  const ref = useRef<HTMLElement>(null);
  const { setExpand } = useMenuStore();

  useEffect(() => {
    // 移动端, 点击关闭菜单
    ref.current?.addEventListener('click', () => {
      document.documentElement.clientWidth < 1024 && setExpand(false);
    });
  }, []);

  return (
    <ProtectedRouter>
      <main className="grid w-screen h-screen lg:grid-cols-[auto_1fr]">
        <Leftbar />
        <section ref={ref} className="grid grid-rows-[auto_1fr] overflow-hidden">
          <Topbar />
          <div className="overflow-auto p-5">
            <Outlet />
          </div>
        </section>
      </main>
    </ProtectedRouter>
  );
};

export default admin;
