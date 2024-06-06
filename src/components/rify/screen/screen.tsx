const screen: React.FC<{}> = () => {
  const [full, setFull] = useState<boolean>(false);

  const isScreen = () => {
    full ? document.exitFullscreen() : document.documentElement.requestFullscreen();
    setFull(!full);
  };

  document.addEventListener('fullscreenchange', () => {
    setFull(!!document.fullscreenElement);
  });

  return (
    <div className="flex items-center cursor-pointer" onClick={isScreen}>
      {!full ? <IconFullScreen size={20} /> : <IconOffScreen size={20} />}
    </div>
  );
};

if (import.meta.env.MODE !== 'pro') screen.displayName = 'rify-screen';

export default screen;
