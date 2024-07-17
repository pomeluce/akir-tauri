import { window as tauriWindow } from '@tauri-apps/api';
import { Close, Maximize, Minimize } from '@tauri/components';

const buttonGroup: React.FC<{}> = () => {
  const [isMaximized, setIsMaximized] = useState<boolean>(false);
  const appWindow = tauriWindow.getCurrent();

  const closeHandle = () => {
    appWindow.hide();
  };
  const minimizeHandle = () => {
    appWindow.minimize();
  };

  const maximizeHandle = () => {
    appWindow.toggleMaximize().then(async () => {
      setIsMaximized(await appWindow.isMaximized());
    });
  };
  return (
    <main className="flex gap-1 cursor-pointer select-none">
      <div onClick={maximizeHandle}>
        <Maximize className="w-4" isFull={isMaximized} />
      </div>
      <div onClick={minimizeHandle}>
        <Minimize className="w-4" />
      </div>
      <div onClick={closeHandle}>
        <Close className="w-4" />
      </div>
    </main>
  );
};

export default buttonGroup;
