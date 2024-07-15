import { app } from '@tauri-apps/api';
import Logo from '/pomeluce.svg';

const about: React.FC<{}> = () => {
  const [visible, setVisible] = useState(false);
  const [version, setVersion] = useState<string>('unknown');

  const linkOpen = () => open('https://github.com/pomeluce/rapidify-react');

  useAsyncEffect(async () => {
    setVersion(await app.getVersion());
  }, []);

  return (
    <>
      <ArcoButton className="flex justify-center items-center" size="large" shape="circle" onClick={() => setVisible(true)}>
        <IconRiQuestionFill />
      </ArcoButton>

      <ArcoModal
        className="min-w-lg min-h-auto border border-rim2 drop-shadow-2xl"
        simple
        title={null}
        visible={visible}
        footer={() => (
          <span className="w-full flex justify-end">
            <button className="px-4 py-1.5 rounded bg-transparent text-xs hover:bg-fill2" onClick={() => setVisible(false)}>
              关闭
            </button>
          </span>
        )}
        closable={false}
        alignCenter={false}
        maskStyle={{ backgroundColor: 'transparent' }}
        style={{ top: '15%', marginLeft: 'auto', marginRight: 'auto' }}
        onCancel={() => setVisible(false)}
      >
        <main className="p-5 px-10 flex flex-col justify-center items-center gap-10">
          <div className="py-3 flex justify-center items-center gap-5">
            <ArcoImage src={Logo} tabIndex={-1} preview={false} />
            <section className="flex flex-col gap-2 items-start">
              <span className="font-semibold text-2xl">Rapidify-Tauri</span>
              <span>Tauri template app for react</span>
            </section>
          </div>
          <footer>
            version {version} @
            <a className="text-link1 cursor-pointer" onClick={linkOpen}>
              rapidify-tauri
            </a>
          </footer>
        </main>
      </ArcoModal>
    </>
  );
};

export default about;
