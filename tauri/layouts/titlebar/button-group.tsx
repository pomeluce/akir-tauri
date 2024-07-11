import { window } from '@tauri-apps/api';
import { Close, Maximize, Minimize } from '@tauri/components';

const buttonGroup: React.FC<{}> = () => {
  const closeHandle = () => {
    window.getCurrent().hide();
  };
  const minimizeHandle = () => {
    window.getCurrent().minimize();
  };

  const maximizeHandle = () => {
    window.getCurrent().toggleMaximize();
  };
  return (
    <main className="flex gap-1 cursor-pointer select-none">
      <div onClick={closeHandle}>
        <Close className="w-4" />
      </div>
      <div onClick={minimizeHandle}>
        <Minimize className="w-4" />
      </div>
      <div onClick={maximizeHandle}>
        <Maximize className="w-4" />
      </div>
    </main>
  );
};

export default buttonGroup;
