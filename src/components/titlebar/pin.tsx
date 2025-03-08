import { getCurrentWindow } from '@tauri-apps/api/window';
import classNames from 'classnames';
import { TbPinnedFilled } from 'react-icons/tb';

const pushpin: React.FC<{}> = () => {
  const [isPined, setIsPined] = useState<boolean>(false);
  const appWindow = getCurrentWindow();

  const handleClick = () => {
    appWindow.setAlwaysOnTop(!isPined);
    setIsPined(!isPined);
  };

  return (
    <button className="flex justify-center items-center" onClick={handleClick}>
      <TbPinnedFilled className={classNames({ 'text-primary6 font-bold': isPined })} />
    </button>
  );
};

export default pushpin;
