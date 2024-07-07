import { debounce } from 'lodash-es';

const setting: React.FC<{}> = () => {
  const ref = useRef<HTMLElement>(null);
  const [links, setLinks] = useState<HTMLAnchorElement[]>();
  const [selectedKeys, setSelectedKeys] = useState<string[]>(['settings.general']);

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
        <ArcoTree.Node title="常用设置" key="settings.general" />
        <ArcoTree.Node title="编辑器配置" key="settings.editor" />
        <ArcoTree.Node title="界面" key="settings.styles" />
      </ArcoTree>
      <main className="w-full border-l border-rim3 overflow-scroll px-10" ref={ref}>
        <a href="#settings.general" className="h1 font-bold text-xl text-word2 !text-link2">
          常用设置
        </a>
        <div className="h-2000px"></div>
        <a href="#settings.editor" className="h1 font-bold text-xl text-word2">
          编辑器配置
        </a>
        <div className="h-2000px"></div>
        <a href="#settings.styles" className="h1 font-bold text-xl text-word2">
          界面
        </a>
        <div className="h-3000px"></div>
      </main>
    </main>
  );
};

export default setting;
