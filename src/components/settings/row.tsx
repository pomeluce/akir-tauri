const SettingRow: React.FC<{ label: string; children?: React.ReactNode }> = props => {
  const { label, children } = props;

  return (
    <section className="grid grid-cols-3 gap-5">
      <h2 className="font-medium">{label}</h2>
      <div className="col-span-2">{children}</div>
    </section>
  );
};

export default SettingRow;
