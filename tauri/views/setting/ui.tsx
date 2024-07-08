const ui: React.FC<{}> = () => {
  const { theme } = useTheme();
  const { changeTheme } = useAppMenu();

  const themeList = [
    {
      label: '系统',
      value: 'system',
    },
    {
      label: '亮色',
      value: 'light',
    },
    {
      label: '深色',
      value: 'dark',
    },
  ];
  return (
    <main className="p-5 flex flex-col gap-3">
      <section className="grid grid-cols-3 gap-5">
        <h2 className="font-medium">主题</h2>
        <div className="col-span-2">
          <ArcoRadio.Group value={theme} options={themeList} onChange={changeTheme} />
        </div>
      </section>
    </main>
  );
};

export default ui;
