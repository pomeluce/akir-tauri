import { I500 } from '@/components/icons';

const INTERNAL_SERVER_ERROR: React.FC<{}> = () => {
  const { navigator } = useRouter();

  return (
    <main className="h-screen flex flex-col justify-center items-center">
      <ArcoResult className="w-full" status={null} icon={<I500 className="w-56" />}>
        <main className="flex flex-col justify-center items-center gap-7 pb-48">
          <span className="text-base md:text-3xl font-bold ">啊哦, 网站出了点小意外</span>
          <span>
            <ArcoButton type="primary" status="danger" onClick={() => navigator({ name: RouteName.HOME })}>
              返回首页
            </ArcoButton>
          </span>
        </main>
      </ArcoResult>
    </main>
  );
};

export default INTERNAL_SERVER_ERROR;
