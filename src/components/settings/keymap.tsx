import { Button, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/shadcn';
import { HotkeyInput } from '@/components';
import SettingRow from './row';

const keymap: React.FC<{}> = () => {
  const { keymaps, rebindHotKey, unbindHotKey, getAllHotkeys } = useAppKeyStore();

  const hotkeyHandle = (key: string): boolean | Promise<boolean> => {
    if (getAllHotkeys().includes(key)) {
      return new Promise<boolean>(resolve => {
        useDialog.confirm({
          defaultOpen: true,
          modal: false,
          children: (
            <DialogContent
              className="max-w-52 top-[40%] drop-shadow-3xl gap-5 [&:focus,&:focus-within,&:focus-visible]:outline-none"
              onInteractOutside={e => e.preventDefault()}
              aria-describedby={undefined}
            >
              <DialogHeader className="items-center">
                <DialogTitle className="text-xl">提示</DialogTitle>
              </DialogHeader>
              <span className="text-center">当前快捷键已被绑定, 是否覆盖原有快捷键?</span>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="secondary" size="sm" onClick={() => resolve(false)}>
                    取消
                  </Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button size="sm" onClick={() => resolve(true)}>
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
        <SettingRow key={keymap.id} label={keymap.label}>
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
        </SettingRow>
      ))}
    </main>
  );
};

export default keymap;
