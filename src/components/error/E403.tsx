import { I403 } from '@/components';

export function E403() {
  const navigate = useNavigate();

  return (
    <main className="h-screen flex justify-center items-center">
      <main className="flex flex-col justify-center items-center gap-7 pb-20">
        <span>
          <I403 className="w-56" />
        </span>
        <span className="text-base md:text-3xl font-bold ">当前资源需要授权访问哦!</span>
        <span>
          <SuiButton className="bg-orange-400 hover:bg-orange-400 hover:opacity-90" onClick={() => navigate({ to: RouteTo.HOME })}>
            返回首页
          </SuiButton>
        </span>
      </main>
    </main>
  );
}
