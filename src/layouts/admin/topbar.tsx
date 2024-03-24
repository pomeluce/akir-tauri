import Screen from '@/components/rify/screen';

const topbar: React.FC<{}> = () => {
  const { switchExpand } = useMenuStore();

  return (
    <main className="flex justify-between items-center py-3 px-5 bg-backdrop3 relative shadow-sm border-b border-rim8 z-40">
      <section className="flex items-center gap-2">
        <span className="flex items-center cursor-pointer text-primary1" onClick={switchExpand}>
          <IconHamburgerButton theme="outline" size={22} strokeWidth={5} />
        </span>
        {/* <rify-breadcrumb :options="topbar.breadcrumb" /> */}
      </section>
      <section className="flex items-center gap-2">
        <Screen />
        {/* <avatar-menu /> */}
      </section>
    </main>
  );
};

export default topbar;
