import { Label, RadioGroup, RadioGroupItem } from '@/shadcn';

const ui: React.FC<{}> = () => {
  const { theme, setTheme } = useTheme();

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
          <RadioGroup className="flex" value={theme} onValueChange={setTheme}>
            {themeList.map((item, index) => (
              <span key={`${item.value}-${index}`} className="flex items-center gap-2">
                <RadioGroupItem id={`theme-${item.value}`} value={item.value} />
                <Label htmlFor={`theme-${item.value}`}>{item.label}</Label>
              </span>
            ))}
          </RadioGroup>
        </div>
      </section>
    </main>
  );
};

export default ui;
