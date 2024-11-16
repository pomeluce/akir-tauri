import { Checkbox, Label } from '@/shadcn';
import { enable, disable } from '@tauri-apps/plugin-autostart';

const general: React.FC<{}> = () => {
  const autoStart = async (value: boolean) => {
    await (value ? enable() : disable());
  };

  return (
    <main className="p-5 flex flex-col gap-3">
      <section className="grid grid-cols-3 gap-5">
        <h2 className="font-medium">开机选项</h2>
        <div className="col-span-2">
          <span className="flex items-center gap-2">
            <Checkbox id="auto_start" onCheckedChange={autoStart} />
            <Label htmlFor="auto_start">开机自启动</Label>
          </span>
        </div>
      </section>
    </main>
  );
};

export default general;
