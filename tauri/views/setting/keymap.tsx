import { HotkeyInput } from '@tauri/components';

const keymap: React.FC<{}> = () => {
  const { keymaps, rebindHotKey, unbindHotKey, getAllHotkeys } = useAppKeyStore();

  const hotkeyHandle = (key: string): boolean | Promise<boolean> => {
    if (getAllHotkeys().includes(key)) {
      return new Promise<boolean>(resolve => {
        SuiConfirm({
          defaultOpen: true,
          modal: false,
          children: (
            <SuiDialogContent className="max-w-xs top-[40%] drop-shadow-3xl gap-5" closable={false} aria-describedby={undefined}>
              <SuiDialogHeader className="items-center">
                <SuiDialogTitle>提示</SuiDialogTitle>
              </SuiDialogHeader>
              <span className="text-center text-sm">当前快捷键已被绑定, 是否覆盖原有快捷键?</span>
              <SuiDialogFooter>
                <SuiDialogClose asChild>
                  <SuiButton variant="secondary" size="xs" onClick={() => resolve(false)}>
                    取消
                  </SuiButton>
                </SuiDialogClose>
                <SuiDialogClose asChild>
                  <SuiButton size="xs" onClick={() => resolve(true)}>
                    确定
                  </SuiButton>
                </SuiDialogClose>
              </SuiDialogFooter>
            </SuiDialogContent>
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
