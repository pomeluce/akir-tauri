import icon from '@/components/_internal/icons/500';

const INTERNAL_SERVER_ERROR: React.FC<{}> = () => {
  return (
    <main className="h-screen flex flex-col justify-center items-center">
      <RifyResult className="w-full" icon={<span className="w-74">{icon({})}</span>}>
        <main className="flex flex-col justify-center items-center gap-7 pb-48">
          <span className="text-base md:text-3xl font-bold ">啊哦, 网站出了点小意外</span>
          <span>
            <RifyButton type="error" onClick={() => useRouter().navigator({ name: RouteName.HOME })}>
              返回首页
            </RifyButton>
          </span>
        </main>
      </RifyResult>
    </main>
  );
};

export default INTERNAL_SERVER_ERROR;
