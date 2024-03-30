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
    <div className={'hidden items-center cursor-pointer text-word4 hover:text-word6 xl:flex'} onClick={isScreen}>
      {!full ? <IconFullScreen theme={'outline'} size={20} /> : <IconOffScreen theme={'outline'} size={20} />}
    </div>
  );
};

if (import.meta.env.MODE !== 'pro') screen.displayName = 'rify-screen';

export default screen;
