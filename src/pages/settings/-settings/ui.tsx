import { Card, CardContent, CardHeader, CardTitle, Switch } from '@/shadcn';
import { TbDeviceLaptop, TbMoonStars, TbSun } from 'react-icons/tb';
import { SystemChecked } from '@/components';
import SettingRow from './row';
import { invoke } from '@tauri-apps/api/core';

const ui: React.FC<{}> = () => {
  const { theme, setTheme } = useTheme();

  const [barStatus, setBarStatus] = useState<boolean>(false);

  const handleCheckBarStatus = (show: boolean) => {
    setBarStatus(show);
    invoke<void>('set_decorations', { show });
  };

  useAsyncEffect(async () => setBarStatus(await invoke<boolean>('get_decorations')), []);

  return (
    <Card className="shadow-none rounded-md">
      <CardHeader>
        <CardTitle>界面</CardTitle>
      </CardHeader>
      <CardContent>
        <SettingRow label="主题">
          <SystemChecked
            defaultValue={theme}
            options={[
              {
                label: '系统',
                value: 'system',
                icon: <TbDeviceLaptop />,
              },
              {
                label: '浅色',
                value: 'light',
                icon: <TbSun />,
              },
              {
                label: '深色',
                value: 'dark',
                icon: <TbMoonStars />,
              },
            ]}
            onChange={value => setTheme(value as ThemeType)}
          />
        </SettingRow>
        <SettingRow label="系统标题栏">
          <Switch checked={barStatus} onCheckedChange={handleCheckBarStatus} />
        </SettingRow>
      </CardContent>
    </Card>
  );
};

export default ui;
