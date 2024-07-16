const home: React.FC<{}> = () => {
  useDBSettings();

  useAsyncEffect(async () => {
    const { addOrUpdate, queryAll } = useDBSettings();

    addOrUpdate('settings.keymap.km_close', 'settings.keymap', 'Ctrl+Q');

    const result = await queryAll();
    console.log(result);
  }, []);

  return <main className="flex flex-col justify-center items-center  bg-backdrop2 rounded-xl border border-rim2">tauri-app 主界面</main>;
};

export default home;
