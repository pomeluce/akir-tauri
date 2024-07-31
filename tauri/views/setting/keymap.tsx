import { HotkeyInput } from '@tauri/components';

const keymap: React.FC<{}> = () => {
  const { keymaps, rebindHotKey, unbindHotKey, getAllHotkeys } = useAppKeyStore();

  const [visible, setVisible] = useState<boolean>(false);

  const hotkeyHandle = (key: string): boolean | Promise<boolean> => {
    if (getAllHotkeys().includes(key)) {
      return new Promise<boolean>(resolve => {
        setVisible(true);
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
      <SuiDialog open={visible} modal={false}>
        {keymaps.map(keymap => (
          <section className="grid grid-cols-3 gap-5" key={keymap.id}>
            <h2 className="font-medium">{keymap.label}</h2>
            <div className="col-span-2">
              <SuiDialogTrigger asChild>
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
              </SuiDialogTrigger>
            </div>
          </section>
        ))}
        <SuiDialogContent aria-describedby={undefined}>
          <SuiDialogHeader>
            <SuiDialogTitle>提示</SuiDialogTitle>
          </SuiDialogHeader>
          <span>当前快捷键已被绑定, 是否覆盖原有快捷键?</span>
          <SuiDialogFooter>
            <SuiButton variant="secondary" onClick={() => setVisible(false)}>
              取消
            </SuiButton>
            <SuiButton
              onClick={() => {
                setVisible(false);
              }}
            >
              确定
            </SuiButton>
          </SuiDialogFooter>
        </SuiDialogContent>
      </SuiDialog>
    </main>
  );
};

export default keymap;
