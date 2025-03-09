import { enable, disable, isEnabled } from '@tauri-apps/plugin-autostart';
import { Card, CardContent, CardHeader, CardTitle, Switch } from '@/shadcn';
import SettingRow from './row';

const general: React.FC<{}> = () => {
  const [checked, setChecked] = useState<boolean>(false);

  const handleCheckedChange = async (value: boolean) => {
    setChecked(value);
    await (value ? enable() : disable());
  };

  useAsyncEffect(async () => {
    setChecked(await isEnabled());
  }, []);

  return (
    <Card className="shadow-none rounded-md">
      <CardHeader>
        <CardTitle>通用</CardTitle>
      </CardHeader>
      <CardContent>
        <SettingRow label="开启自启">
          <Switch checked={checked} onCheckedChange={handleCheckedChange} />
        </SettingRow>
      </CardContent>
    </Card>
  );
};

export default general;
