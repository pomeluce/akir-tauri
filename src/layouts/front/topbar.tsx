import Logo from '/pomeluce.svg';
import { Screen } from '@/components';

const { topMenu } = config();

const topbar: React.FC<{}> = () => {
  const { toggleTheme } = useThemeStore();
  const change = () => toggleTheme();

  return (
    <main className={`flex items-center h-[65px] bg-backdrop1 shadow-sm border-b border-rim8 sticky top-0 z-50`}>
      <div className="flex justify-between items-center px-3 w-full 2xl:(w-page m-auto)">
        <section className="flex items-center xl:items-stretch md:mr-6 text-word4">
          <div className="flex justify-center items-center">
            <Link to="/" className="flex justify-between items-center gap-1 font-bold mr-5 text-primary1 hover:text-link1">
              <AntImage rootClassName="w-6 h-6" src={Logo} preview={false} />
              <span className="font-bold text-xl uppercase">rapidify-react</span>
            </Link>
          </div>
          <main className="xl:flex justify-center items-center gap-3 font-bold opacity-95 hidden">
            {topMenu.menu.map((menu, index) => (
              <NavLink key={index} to={menu.key} className={({ isActive }) => `flex items-center gap-1 hover:text-link1 ${isActive ? 'text-link1' : ''}`}>
                {menu.label}
              </NavLink>
            ))}
          </main>
        </section>
        <section className="flex items-center gap-2">
          <Screen />
          {/* <avatar-menu /> */}
          <AntSwitch onChange={change} />
        </section>
      </div>
    </main>
  );
};

export default topbar;
