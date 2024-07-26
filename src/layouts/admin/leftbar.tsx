import Logo from '/pomeluce.svg';
import { CSSProperties } from 'react';
import { Menu } from '@common/components';
import { router } from '@/plugins';

const leftbar: React.FC<{}> = () => {
  const { isExpand, setExpand, menus } = useMenuStore();

  const closeMenu = () => document.documentElement.clientWidth < 1024 && setExpand(false);

  useEffect(() => {
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
    <div className="bg-backdrop2 border-r border-rim2 absolute h-full overflow-auto z-50 lg:relative shadow-md lg:shadow-none">
      <main>
        <nav className="text-word1">
          <NavLink className="flex justify-center items-start px-7 py-4 gap-1 cursor-pointer hover:text-word2" to={RoutePath.HOME}>
            <ArcoImage className="w-6 h-6" src={Logo} preview={false} />
            {isExpand && <span className="text-lg font-bold uppercase">rapidify-react</span>}
          </NavLink>
          <div className="flex justify-center mx-1.5" style={{ '--color-text-2': 'var(--hue-grey-10)' } as CSSProperties}>
            <Menu collapse={!isExpand} options={menus.backend} defaultSelectedKeys={[router.record.route.name || RouteName.ADMIN]} />
          </div>
        </nav>
      </main>
    </div>
  );
};

export default leftbar;
