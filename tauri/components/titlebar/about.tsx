import { app } from '@tauri-apps/api';
import Logo from '/pomeluce.svg';

const about: React.FC<{}> = () => {
  const [version, setVersion] = useState<string>('unknown');

  const linkOpen = () => open('https://github.com/pomeluce/rapidify-react');

  useAsyncEffect(async () => {
    setVersion(await app.getVersion());
  }, []);

  return (
    <SuiDialog modal={false}>
      <SuiDialogTrigger asChild>
        <button className="flex justify-center items-center">
          <IconRiQuestionFill />
        </button>
      </SuiDialogTrigger>
      <SuiDialogContent className="top-[25%] drop-shadow-3xl select-none" aria-describedby={undefined}>
        <SuiDialogTitle />
        <main className="p-5 px-10 flex flex-col justify-center items-center gap-10">
          <div className="py-3 flex justify-center items-center gap-5">
            <ArcoImage src={Logo} tabIndex={-1} preview={false} draggable={false} />
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
        <SuiDialogFooter>
          <SuiDialogClose className="flex justify-end" asChild>
            <SuiButton size="sm" variant="ghost">
              关闭
            </SuiButton>
          </SuiDialogClose>
        </SuiDialogFooter>
      </SuiDialogContent>
    </SuiDialog>
  );
};

export default about;
