// import { BaseDirectory, readDir } from '@tauri-apps/plugin-fs';

import { HotkeyInput } from '@tauri/components';

const home: React.FC<{}> = () => {
  /* useAsyncEffect(async () => {
    const entries = await readDir('.config', { baseDir: BaseDirectory.Home });
    for (const entry of entries) {
      console.log(`Entry: ${entry.name}`);
    }
  }, []); */

  return (
    <main className="flex flex-col justify-center items-center  bg-backdrop2 rounded-xl border border-rim2">
      tauri-app 主界面
      <HotkeyInput placeholder="请输入需要绑定的按键, 支持组合按键" />
    </main>
  );
};

export default home;
