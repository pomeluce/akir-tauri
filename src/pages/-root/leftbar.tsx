import Logo from '/akir.svg';
import classNames from 'classnames';
import { menus } from '@/configs/menus';

const leftbar: React.FC<{}> = () => {
  return (
    <main className="min-w-48 flex flex-col gap-1 p-3">
      <span className="w-full flex items-center gap-1 px-5 py-2 select-none cursor-default">
        <img src={Logo} tabIndex={-1} width={30} draggable={false} />
        <span className="flex-1 text-center uppercase font-bold text-indigo-700 dark:text-indigo-400">akir</span>
      </span>
      {menus.map((menu, index) => (
        <nav key={`key-${index}`}>
          <Link to={menu.to} activeOptions={{ exact: true }}>
            {({ isActive }) => (
              <button
                className={classNames('w-full flex items-center gap-1 font-semibold px-5 py-3 rounded-lg outline-width-0', {
                  '!bg-backdrop2 drop-shadow-sm border border-rim2 text-word1': isActive,
                })}
              >
                {menu.icon({ size: 20 })}
                <span className="flex-1">{menu.title}</span>
              </button>
            )}
          </Link>
        </nav>
      ))}
    </main>
  );
};

export default leftbar;
