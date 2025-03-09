const SettingRow: React.FC<{ label: string; contentClassName?: React.HTMLAttributes<HTMLElement>['className']; children?: React.ReactNode }> = props => {
  const { label, contentClassName, children } = props;

  return (
    <section className="flex justify-between items-center px-2 py-1">
      <h1 className="min-w-24 text-sm font-medium">{label}</h1>
      <div className={contentClassName}>{children}</div>
    </section>
  );
};

export default SettingRow;
