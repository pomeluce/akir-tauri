import { app } from '@tauri-apps/api';
import classNames from 'classnames';
import Logo from '/pomeluce.svg';

const leftbar: React.FC<{}> = () => {
  const { menus } = useAppMenu();

  const [name, setName] = useState<string>('1.0.0');

  useAsyncEffect(async () => {
    setName((await app.getVersion()).split('.')[0]);
  }, []);

  return (
    <main className="min-w-32 flex flex-col items-center gap-3 p-3">
      <span className="flex justify-center items-center gap-1 select-none cursor-default">
        <ArcoImage src={Logo} tabIndex={-1} preview={false} width={20} draggable={false} />
        <span className="text-sm uppercase font-bold text-[#6b9e59]">v{name}</span>
      </span>
      {menus.map((menu, index) => (
        <nav key={`key-${index}`}>
          <button
            className={classNames('flex justify-center items-center gap-1 text-sm px-5 py-1.5 rounded-lg bg-transparent', {
              '!bg-backdrop2 drop-shadow-sm border border-rim2 text-word1 font-semibold': menu.isActive,
            })}
            onClick={menu.handleClick}
          >
            {menu.icon(menu.isActive ? { strokeWidth: 1 } : {})} {menu.title}
          </button>
        </nav>
      ))}
    </main>
  );
};

export default leftbar;
