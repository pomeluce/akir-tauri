import { I404 } from '@/components/icons';

const NOT_FOUND: React.FC<{}> = () => {
  const { navigator } = useRouter();

  return (
    <main className="h-screen flex flex-col justify-center items-center">
      <ArcoResult className="w-full" status={null} icon={<I404 className="w-56" />}>
        <main className="flex flex-col justify-center items-center gap-7 pb-48">
          <span className="text-base md:text-3xl font-bold ">抱歉, 访问的资源不存在</span>
          <span>
            <ArcoButton type="primary" onClick={() => navigator({ name: RouteName.HOME })}>
              返回首页
            </ArcoButton>
          </span>
        </main>
      </ArcoResult>
    </main>
  );
};

export default NOT_FOUND;
