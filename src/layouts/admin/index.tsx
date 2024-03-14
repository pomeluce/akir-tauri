import Leftbar from '@/layouts/admin/leftbar';
import Topbar from '@/layouts/admin/topbar';

const admin: React.FC<{}> = () => {
  const ref = useRef<HTMLElement>(null);
  const { setExpand } = useMenuStore();

  useMounted(() => {
    // 移动端, 点击关闭菜单
    ref.current?.addEventListener('click', () => {
      document.documentElement.clientWidth < 1024 && setExpand(false);
    });
  });

  return (
    <main className="grid w-screen h-screen lg:grid-cols-[auto_1fr]">
      <Leftbar />
      <section ref={ref} className="grid grid-rows-[auto_1fr] overflow-hidden">
        <Topbar />
        <div className="overflow-auto p-5">
          <Outlet />
        </div>
      </section>
    </main>
  );
};

export default admin;
