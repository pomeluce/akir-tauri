import classNames from 'classnames';
import { debounce } from 'lodash-es';
import { defaultKeys, settings } from '@tauri/configs/settings';

export const Route = createFileRoute('/settings')({
  component: () => {
    const ref = useRef<HTMLElement>(null);
    const [links, setLinks] = useState<HTMLAnchorElement[]>();
    const [selectedKey, setSelectedKey] = useState<string>(defaultKeys);

    const scrollHandler = debounce(() => {
      if (links) {
        const range = document.documentElement.clientHeight - 80;
        const rect = links.map(item => item.getBoundingClientRect());
        for (let i = 0; i < rect.length; i++) {
          if ((rect[i].top >= 0 && rect[i].top <= range) || (rect[i].top < 0 && ((rect[i + 1] && rect[i + 1].top > range) || rect[i + 1] === undefined))) {
            setSelectedKey(links[i].hash.substring(1));
            return;
          }
        }
      }
    }, 100);

    const selectedHandler = (key: string) => {
      if (links) {
        links.find(link => link.hash === `#${key}`)?.scrollIntoView({ behavior: 'smooth' });
        setSelectedKey(key);
      }
    };

    useEffect(() => {
      if (ref.current) {
        setLinks(Array.from(ref.current.querySelectorAll('a[href^="#"]') as NodeListOf<HTMLAnchorElement>));
      }
    }, []);

    useEffect(() => {
      if (ref.current) {
        ref.current.addEventListener('scroll', scrollHandler);
        return () => {
          ref.current?.removeEventListener('scroll', scrollHandler);
        };
      }
    }, [links]);

    return (
      <main className="flex p-5 overflow-hidden">
        <nav className="w-40 grid grid-flow-row auto-rows-max text-sm">
          {settings.map(({ title, key }) => (
            <a
              key={key}
              className={classNames(
                'flex w-full items-center rounded-md border border-transparent pl-5 py-1 hover:underline cursor-pointer font-medium',
                selectedKey === key ? 'text-primary5' : ' text-word1',
              )}
              onClick={() => selectedHandler(key)}
            >
              {title}
            </a>
          ))}
        </nav>
        <main className="w-full border-l border-rim3 overflow-scroll px-10 text-word2" ref={ref}>
          {settings.map(({ title, key, content }) => (
            <span key={key}>
              <a href={`#${key}`} className="h1 font-bold text-xl text-word1">
                {title}
              </a>
              {content}
            </span>
          ))}
        </main>
      </main>
    );
  },
});
