import Logo from '/akir.svg';
import classNames from 'classnames';
import { menus } from '@/configs/menus';

const leftbar: React.FC<{}> = () => {
  return (
    <main className="min-w-32 flex flex-col items-center gap-3 p-3">
      <span className="flex justify-center items-center gap-1 select-none cursor-default">
        <img src={Logo} tabIndex={-1} width={20} draggable={false} />
        <span className="text-sm uppercase font-bold text-indigo-700 dark:text-indigo-400">akir</span>
      </span>
      {menus.map((menu, index) => (
        <nav key={`key-${index}`}>
          <Link to={menu.to} activeOptions={{ exact: true }}>
            {({ isActive }) => (
              <button
                className={classNames('flex justify-center items-center gap-1 text-sm px-5 py-1.5 rounded-lg outline-width-0', {
                  '!bg-backdrop2 drop-shadow-sm border border-rim2 text-word1 font-semibold': isActive,
                })}
              >
                {menu.icon(!isActive ? { strokeWidth: 1 } : {})} {menu.title}
              </button>
            )}
          </Link>
        </nav>
      ))}
    </main>
  );
};

export default leftbar;
