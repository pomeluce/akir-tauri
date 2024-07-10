import classNames from 'classnames';

const leftbar: React.FC<{}> = () => {
  const { menus } = useAppMenu();

  return (
    <main className="py-5 flex flex-col gap-3">
      {menus.map((menu, index) => (
        <nav key={`key-${index}`} className="bg-backdrop2 flex flex-col gap-1 border border-rim2 rounded-lg">
          <ArcoTooltip content={menu.title} position="right">
            <button className="flex bg-transparent" onClick={menu.handleClick}>
              <section
                className={classNames('hover:bg-primary4 hover:text-white rounded p-3 text-word2', {
                  'bg-primary4 !text-white': menu.isActive,
                })}
              >
                {menu.icon}
              </section>
            </button>
          </ArcoTooltip>
        </nav>
      ))}
    </main>
  );
};

export default leftbar;
