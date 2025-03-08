import { Label, RadioGroup, RadioGroupItem } from '@/shadcn';
import SettingRow from './row';
import { invoke } from '@tauri-apps/api/core';

type BarStatusType = 'show' | 'hide';

const ui: React.FC<{}> = () => {
  const { theme, setTheme } = useTheme();

  const [barStatus, setBarStatus] = useState<BarStatusType>('show');

  const themeList = [
    {
      label: '系统',
      value: 'system',
    },
    {
      label: '亮色',
      value: 'light',
    },
    {
      label: '深色',
      value: 'dark',
    },
  ];

  const barStatusList = [
    {
      label: '显示',
      value: 'show',
    },
    {
      label: '隐藏',
      value: 'hide',
    },
  ];

  const handleToggleBarStatus = (value: BarStatusType) => {
    setBarStatus(value);
    invoke<void>('set_decorations', { show: value === 'show' });
  };

  useAsyncEffect(async () => {
    const isDecorations = await invoke<boolean>('get_decorations');
    setBarStatus(isDecorations ? 'show' : 'hide');
  }, []);

  return (
    <main className="p-5 flex flex-col gap-3">
      <SettingRow label="主题">
        <RadioGroup className="flex" value={theme} onValueChange={setTheme}>
          {themeList.map((item, index) => (
            <span key={`${item.value}-${index}`} className="flex items-center gap-2">
              <RadioGroupItem id={`theme-${item.value}`} value={item.value} />
              <Label htmlFor={`theme-${item.value}`}>{item.label}</Label>
            </span>
          ))}
        </RadioGroup>
      </SettingRow>
      <SettingRow label="系统标题栏">
        <RadioGroup className="flex" value={barStatus} onValueChange={handleToggleBarStatus}>
          {barStatusList.map((item, index) => (
            <span key={`${item.value}-${index}`} className="flex items-center gap-2">
              <RadioGroupItem id={`titlebar-${item.value}`} value={item.value} />
              <Label htmlFor={`titlebar-${item.value}`}>{item.label}</Label>
            </span>
          ))}
        </RadioGroup>
      </SettingRow>
    </main>
  );
};

export default ui;
