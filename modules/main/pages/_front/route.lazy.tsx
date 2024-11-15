import Logo from '/pomeluce.svg';
import { WithSuspense } from '@common/components';
import { TopbarMenu } from '@main/components';
import { topMenus } from '@main/configs/menus';

export const Route = createLazyFileRoute('/_front')({
  component: () => (
    <WithSuspense>
      <main className="flex items-center h-[65px] bg-backdrop2 border-b border-rim2 sticky top-0 z-50">
        <div className="flex justify-between items-center px-3 w-full 2xl:w-page 2xl:m-auto">
          <section className="flex items-center xl:items-stretch md:mr-6">
            <div className="flex justify-center items-center">
              <Link to={RouteTo.HOME} className="flex justify-between items-center gap-1 font-bold mr-5 hover:text-word1/80">
                <img className="w-5 h-5" src={Logo} />
                <span className="font-bold uppercase">rapidify</span>
              </Link>
            </div>
            <main className="xl:flex justify-center items-center gap-3 font-bold opacity-95 hidden">
              {topMenus.map((menu, index) => (
                <Link key={index} to={menu.key} className="flex items-center gap-1 hover:text-link1" activeProps={{ className: 'text-link1' }}>
                  {menu.label}
                </Link>
              ))}
            </main>
          </section>
          <TopbarMenu />
        </div>
      </main>
      <main className="w-full 2xl:w-page mx-auto p-3 mt-5">
        <Outlet />
      </main>
    </WithSuspense>
  ),
});
