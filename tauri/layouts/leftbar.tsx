import classNames from 'classnames';

const leftbar: React.FC<{}> = () => {
  const { menus } = useAppMenu();

  return (
    <main className="flex flex-col gap-3">
      {menus.map((menu, index) => (
        <nav key={`key-${index}`}>
          <button
            className={classNames('flex justify-center items-center gap-1 text-sm px-2 py-1.5 rounded-lg bg-transparent', {
              '!bg-backdrop2 drop-shadow-sm border border-rim2 text-word1 font-semibold': menu.isActive,
            })}
            onClick={menu.handleClick}
          >
            {menu.icon} {menu.title}
          </button>
        </nav>
      ))}
    </main>
  );
};

export default leftbar;
