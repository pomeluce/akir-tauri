import { I403 } from '@/components';
import { router } from '@/plugins';

const FORBIDDEN: React.FC<{}> = () => {
  return (
    <main className="h-screen flex flex-col justify-center items-center">
      <ArcoResult className="w-full" status={null} icon={<I403 className="w-56" />}>
        <main className="flex flex-col justify-center items-center gap-7 pb-48">
          <span className="text-base md:text-3xl font-bold ">当前资源需要授权访问哦!</span>
          <span>
            <ArcoButton type="primary" status="warning" onClick={() => router.navigator({ name: RouteName.HOME })}>
              返回首页
            </ArcoButton>
          </span>
        </main>
      </ArcoResult>
    </main>
  );
};

export default FORBIDDEN;
