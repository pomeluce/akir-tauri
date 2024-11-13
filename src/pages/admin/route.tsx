import { WithSuspense } from '@common/components';
import { Leftbar, TopbarMenu } from '@/components';

export const Route = createFileRoute('/admin')({
  beforeLoad: ctx => useAppGuard(ctx, { auth: true }),
  component: () => (
    <WithSuspense>
      <SuiSidebarProvider>
        <Leftbar />
        <main className="relative flex flex-col flex-1">
          <main className="flex justify-between h-[65px] items-center py-3 px-5 bg-backdrop2 relative border-b border-rim2 z-40">
            <SuiSidebarTrigger />
            <TopbarMenu />
          </main>
          <div className="p-5 flex-1">
            <Outlet />
          </div>
        </main>
      </SuiSidebarProvider>
    </WithSuspense>
  ),
});
