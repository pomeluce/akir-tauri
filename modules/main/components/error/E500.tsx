import { I500 } from '../icons';

export function E500() {
  const navigate = useNavigate();

  return (
    <main className="h-screen flex justify-center items-center">
      <main className="flex flex-col justify-center items-center gap-7 pb-20">
        <span>
          <I500 className="w-56" />
        </span>
        <span className="text-base md:text-3xl font-bold ">啊哦, 网站出了点小意外</span>
        <span>
          <SuiButton variant="destructive" onClick={() => navigate({ to: RouteTo.HOME })}>
            返回首页
          </SuiButton>
        </span>
      </main>
    </main>
  );
}
