import { Button, Dialog, DialogClose, DialogContent, DialogFooter, DialogTitle, DialogTrigger } from '@/shadcn';
import Logo from '/pomeluce.svg';
import { app } from '@tauri-apps/api';

const about: React.FC<{}> = () => {
  const [version, setVersion] = useState<string>('unknown');

  const linkOpen = () => open('https://github.com/pomeluce/rapidify-react');

  useAsyncEffect(async () => {
    setVersion(await app.getVersion());
  }, []);

  return (
    <Dialog modal={false}>
      <DialogTrigger asChild>
        <button className="flex justify-center items-center">
          <IconRiQuestionFill />
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-md top-[25%] drop-shadow-3xl select-none" closable={false} aria-describedby={undefined}>
        <DialogTitle />
        <main className="p-5 px-10 flex flex-col justify-center items-center gap-5">
          <div className="py-3 flex justify-center items-center gap-5">
            <img src={Logo} tabIndex={-1} draggable={false} />
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
        <DialogFooter>
          <DialogClose className="flex justify-end" asChild>
            <Button size="sm" variant="ghost">
              关闭
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default about;
