import classNames from 'classnames';

const leftbar: React.FC<{}> = () => {
  const { menus } = useAppMenu();

  return (
    <main className="px-2.5 py-1.5 bg-backdrop2 drop-shadow-md border-r border-rim3 flex flex-col gap-1">
      {menus.map((menu, index) => (
        <nav key={`key-${index}`} className="flex flex-col gap-1">
          <ArcoTooltip content={menu.title} position="right">
            <button className="flex bg-transparent" onClick={menu.handleClick}>
              <section
                className={classNames('hover:bg-primary4 hover:text-white rounded p-2 text-word2', {
                  'bg-primary4 !text-white': menu.isActive,
                })}
              >
                {menu.icon}
              </section>
            </button>
          </ArcoTooltip>
          <span className="border border-rim4 rounded"></span>
        </nav>
      ))}
    </main>
  );
};

export default leftbar;
