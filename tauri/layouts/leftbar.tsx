import classNames from 'classnames';

const leftbar: React.FC<{}> = () => {
  const { menus } = useAppMenu();

  return (
    <main className="py-3 flex flex-col gap-3">
      {menus.map((menu, index) => (
        <nav key={`key-${index}`} className="bg-backdrop2 flex flex-col gap-1 border border-rim2 rounded-lg">
          <ArcoTooltip className="text-sm" mini content={menu.title} position="rb">
            <button className="flex bg-transparent" onClick={menu.handleClick}>
              <section
                className={classNames('hover:text-primary5 rounded p-2.5 text-word2', {
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
