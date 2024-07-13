import { getCurrent } from '@tauri-apps/api/window';

const pushpin: React.FC<{}> = () => {
  const [isPined, setIsPined] = useState<boolean>(false);
  const appWindow = getCurrent();

  const handleClick = () => {
    appWindow.setAlwaysOnTop(!isPined);
    setIsPined(!isPined);
  };

  return (
    <ArcoButton className="flex justify-center items-center" type={isPined ? 'primary' : 'default'} size="large" shape="circle" onClick={handleClick}>
      <IconRiPushpin2Fill />
    </ArcoButton>
  );
};

export default pushpin;
