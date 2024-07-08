import { debounce } from 'lodash-es';

const setting: React.FC<{}> = () => {
  const { defaultKeys, settings } = useAppSettings();

  const ref = useRef<HTMLElement>(null);
  const [links, setLinks] = useState<HTMLAnchorElement[]>();
  const [selectedKeys, setSelectedKeys] = useState<string[]>(defaultKeys);

  const scrollHandler = debounce(() => {
    if (links) {
      const range = document.documentElement.clientHeight - 80;
      const rect = links.map(item => item.getBoundingClientRect());
      for (let i = 0; i < rect.length; i++) {
        if ((rect[i].top >= 0 && rect[i].top <= range) || (rect[i].top < 0 && ((rect[i + 1] && rect[i + 1].top > range) || rect[i + 1] === undefined))) {
          setSelectedKeys([links[i].hash.substring(1)]);
        }
      }
    }
  }, 100);

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
    <main className="w-page overflow-scroll mx-auto my-10 flex">
      <ArcoTree
        className="w-40"
        autoExpandParent={false}
        defaultSelectedKeys={selectedKeys}
        selectedKeys={selectedKeys}
        icons={{
          switcherIcon: IconRiArrowDownSLine({}),
          dragIcon: IconRiArrowRightSLine({}),
        }}
        onSelect={keys => {
          if (links) {
            links.find(link => link.hash === `#${keys[0]}`)?.scrollIntoView({ behavior: 'smooth' });
          }
        }}
      >
        {settings.map(({ title, key }) => (
          <ArcoTree.Node title={title} key={key} _key={key} />
        ))}
      </ArcoTree>
      <main className="w-full border-l border-rim3 overflow-scroll px-10" ref={ref}>
        {settings.map(({ title, key, content }) => (
          <span key={key}>
            <a href={`#${key}`} className="h1 font-bold text-xl text-primary4">
              {title}
            </a>
            {content}
          </span>
        ))}
      </main>
    </main>
  );
};

export default setting;
