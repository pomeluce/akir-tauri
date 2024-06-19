import { TopbarMenu } from '@/components';

const topbar: React.FC<{}> = () => {
  const { switchExpand } = useMenuStore();

  return (
    <main className="flex justify-between h-[65px] items-center py-3 px-5 bg-backdrop2 relative border-b border-rim2 z-40">
      <section className="flex items-center gap-2">
        <span className="flex items-center cursor-pointer text-primary6" onClick={switchExpand}>
          <IconRiMenuLine size={22} />
        </span>
      </section>
      <TopbarMenu />
    </main>
  );
};

export default topbar;
