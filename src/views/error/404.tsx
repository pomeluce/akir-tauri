import { I404 } from '@/components';
import { router } from '@/plugins';

const NOT_FOUND: React.FC<{}> = () => {
  return (
    <main className="h-screen flex justify-center items-center">
      <main className="flex flex-col justify-center items-center gap-7 pb-20">
        <span>
          <I404 className="w-56" />
        </span>
        <span className="text-base md:text-3xl font-bold ">抱歉, 访问的资源不存在</span>
        <span>
          <SuiButton onClick={() => router.navigator({ name: RouteName.HOME })}>返回首页</SuiButton>
        </span>
      </main>
    </main>
  );
};

export default NOT_FOUND;
