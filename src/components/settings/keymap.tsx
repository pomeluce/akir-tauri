import { Button, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/shadcn';
import { HotkeyInput } from '@/components';

const keymap: React.FC<{}> = () => {
  const { keymaps, rebindHotKey, unbindHotKey, getAllHotkeys } = useAppKeyStore();

  const hotkeyHandle = (key: string): boolean | Promise<boolean> => {
    if (getAllHotkeys().includes(key)) {
      return new Promise<boolean>(resolve => {
        useDialog.confirm({
          defaultOpen: true,
          modal: false,
          children: (
            <DialogContent className="max-w-xs top-[40%] drop-shadow-3xl gap-5" closable={false} aria-describedby={undefined}>
              <DialogHeader className="items-center">
                <DialogTitle>提示</DialogTitle>
              </DialogHeader>
              <span className="text-center text-sm">当前快捷键已被绑定, 是否覆盖原有快捷键?</span>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="secondary" size="xs" onClick={() => resolve(false)}>
                    取消
                  </Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button size="xs" onClick={() => resolve(true)}>
                    确定
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          ),
        });
      });
    }
    return true;
  };

  return (
    <main className="p-5 flex flex-col gap-3">
      {keymaps.map(keymap => (
        <section className="grid grid-cols-3 gap-5" key={keymap.id}>
          <h2 className="font-medium">{keymap.label}</h2>
          <div className="col-span-2">
            <HotkeyInput
              className="max-w-sm"
              defaultHotkeys={keymap.key}
              placeholder="请输入需要绑定的按键, 支持组合按键"
              onAddHotkey={key => {
                rebindHotKey(keymap.id, key);
              }}
              onDeleteHotkey={key => {
                unbindHotKey(keymap.id, key);
              }}
              onHotkeyVerify={hotkeyHandle}
            />
          </div>
        </section>
      ))}
    </main>
  );
};

export default keymap;
