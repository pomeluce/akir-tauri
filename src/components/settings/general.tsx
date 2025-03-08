import { enable, disable, isEnabled } from '@tauri-apps/plugin-autostart';
import SettingRow from './row';
import { Switch } from '@/shadcn/ui/switch';

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
    <main className="p-5 flex flex-col gap-3">
      <SettingRow label="开机自启">
        <Switch checked={checked} onCheckedChange={handleCheckedChange} />
      </SettingRow>
    </main>
  );
};

export default general;
