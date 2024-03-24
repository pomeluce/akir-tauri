import style from './style/topbar.module.scss';
import Logo from '/pomeluce.svg';
import Screen from '@/components/rify/screen';

const { topMenu } = config();

const topbar: React.FC<{}> = () => {
  return (
    <main className={`${style.topbar} flex items-center h-[65px] bg-white shadow-sm border-b border-gray-300 sticky top-0 z-50`}>
      <div className="flex justify-between items-center px-3 w-full 2xl:w-page 2xl:m-auto">
        <section className="flex items-center xl:items-stretch md:mr-6 text-gray-600">
          <div className="flex justify-center items-center">
            <Link to="/" className="flex justify-between items-center gap-1 font-bold mr-5 text-rify-primary">
              <AntImage rootClassName="w-6 h-6" src={Logo} preview={false} />
              <span className="font-bold text-xl uppercase">rapidify-vue</span>
            </Link>
          </div>
          <main className="xl:flex justify-center items-center gap-3 font-bold opacity-95 hidden">
            {topMenu.menu.map((menu, index) => (
              <NavLink key={index} to={menu.key} className={({ isActive }) => `flex items-center gap-1 ${isActive ? 'text-indigo-600' : ''}`}>
                {menu.label}
              </NavLink>
            ))}
          </main>
        </section>
        <section className="flex items-center gap-2">
          <Screen />
          {/* <avatar-menu /> */}
        </section>
      </div>
    </main>
  );
};

export default topbar;
