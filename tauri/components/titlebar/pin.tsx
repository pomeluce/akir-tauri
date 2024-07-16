import { getCurrent } from '@tauri-apps/api/window';
import classNames from 'classnames';

const pushpin: React.FC<{}> = () => {
  const [isPined, setIsPined] = useState<boolean>(false);
  const appWindow = getCurrent();

  const handleClick = () => {
    appWindow.setAlwaysOnTop(!isPined);
    setIsPined(!isPined);
  };

  return (
    <button className="flex justify-center items-center bg-transparent" onClick={handleClick}>
      <IconRiPushpin2Fill className={classNames({ 'text-primary6 font-bold': isPined })} />
    </button>
  );
};

export default pushpin;
