const keymap: React.FC<{}> = () => {
  const { keymaps } = useAppKey();

  return (
    <main className="p-5 flex flex-col gap-3">
      {keymaps.map(keymap => (
        <section className="grid grid-cols-3 gap-5" key={keymap.id}>
          <h2 className="font-medium">{keymap.label}</h2>
          <div className="col-span-2">
            <ArcoInput className="w-64" allowClear placeholder="键入按键绑定" defaultValue={keymap.key.toUpperCase()} />
          </div>
        </section>
      ))}
    </main>
  );
};

export default keymap;
