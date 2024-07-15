import { HotkeyInput } from '@tauri/components';

const keymap: React.FC<{}> = () => {
  const { keymaps, rebindHotKey, unbindHotKey, getAllHotkeys } = useAppKeyStore();

  const hotkeyHandle = (key: string): boolean | Promise<boolean> => {
    if (getAllHotkeys().includes(key)) {
      return new Promise<boolean>(resolve => {
        ArcoModal.confirm({
          className: 'border border-rim2 drop-shadow-2xl',
          title: <span className="flex justify-center items-center gap-2">{IconRiInformationFill({ className: 'text-primary6' })} 提示</span>,
          content: '当前快捷键已被绑定, 是否覆盖原有快捷键?',
          maskStyle: { backgroundColor: 'transparent' },
          icon: null,
          onOk: () => {
            resolve(true);
          },
          onCancel: () => {
            resolve(false);
          },
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
