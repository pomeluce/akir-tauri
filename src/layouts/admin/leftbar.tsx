import Logo from '/pomeluce.svg';
import { RouteRecord } from 'react-router-dom';
import { forEach } from 'lodash-es';
import records from '@/routes';

const leftbar: React.FC<{}> = () => {
  const { isExpand, setExpand } = useMenuStore();
  const { context: router, open, navigator } = useRouter();

  const ref = useRef<HTMLDivElement>(null);
  const active = useRef<HTMLDivElement>(null);

  const routes = records
    .filter(record => record.children?.length)
    .filter(record => record.meta?.menu)
    .sort((r1, r2) => (r1.meta?.menu?.order ?? 0) - (r2.meta?.menu?.order ?? 0));

  const goto = (route: RouteRecord) => {
    route.meta?.menu?.blank ? open(route, '_blank') : navigator({ name: route.name });
  };

  const toggleMenuList = (index: number) => {
    ref.current?.getElementsByClassName('menu-item__list')[index].classList.toggle('hidden');
    const el = ref.current?.getElementsByClassName('menu-item__suffix')[index].children;
    forEach(el, item => {
      item.classList.contains('hidden') ? item.classList.remove('hidden') : item.classList.add('hidden');
    });
  };

  const closeMenu = () => document.documentElement.clientWidth < 1024 && setExpand(false);

  useEffect(() => {
    // 当前路由自动展开
    (active.current?.parentElement?.previousElementSibling as HTMLElement).click();
    // 加载时为移动端, 则关闭菜单
    closeMenu();

    // 监听窗口变化, 调整菜单状态
    window.addEventListener('resize', closeMenu);

    return () => {
      // 组件卸载, 移除监听
      window.removeEventListener('resize', closeMenu);
    };
  }, []);

  return (
    <div className="bg-backdrop3 border-r border-rim8 shadow-lg absolute h-full overflow-auto z-50 lg:(relative shadow-none)">
      <main className={isExpand ? '' : ' hidden'}>
        <nav className="text-word12">
          <NavLink className="flex justify-center items-start px-7 py-4 gap-1 cursor-pointer hover:text-word11" to={RoutePath.HOME}>
            <AntImage rootClassName="w-6 h-6" src={Logo} preview={false} />
            <span className="text-lg font-bold uppercase">rapidify-vue</span>
          </NavLink>
          <div ref={ref}>
            {routes.map((route: RouteRecord, index: number) => (
              <section key={index} className="flex flex-col mx-7 py-5 text-sm font-medium border-b border-rim8">
                <article className="flex justify-between items-center cursor-pointer" onClick={() => toggleMenuList(index)}>
                  <span className="flex items-center gap-2">
                    {route.meta?.menu?.icon && route.meta?.menu?.icon({ size: 16 })}
                    <span className="select-none">{route.meta?.menu?.label}</span>
                  </span>
                  <span className="menu-item__suffix">
                    <IconDown className="hidden" size="16" />
                    <IconRight size="16" />
                  </span>
                </article>
                <article className="menu-item__list hidden">
                  {route.children?.map((item: RouteRecord, index: number) => (
                    <div
                      ref={item.name === router?.name ? active : undefined}
                      key={index}
                      className={`px-5 py-3 my-3 rounded text-primary11 bg-primary10 opacity-80 cursor-pointer hover:text-white !hover:(bg-primary1 opacity-95)${item.name === router?.name ? ' !bg-primary1 opacity-95 text-white' : ''}`}
                      onClick={() => goto(item)}
                    >
                      {item.meta?.menu?.label}
                    </div>
                  ))}
                </article>
              </section>
            ))}
          </div>
        </nav>
      </main>
    </div>
  );
};

export default leftbar;
