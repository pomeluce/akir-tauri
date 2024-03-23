import icon from '@/components/_internal/icons/404';

const NOT_FOUND: React.FC<{}> = () => {
  return (
    <main className="h-screen flex flex-col justify-center items-center">
      <RifyResult className="w-full" icon={<span className="w-74">{icon({})}</span>}>
        <main className="flex flex-col justify-center items-center gap-7 pb-48">
          <span className="text-base md:text-3xl font-bold ">抱歉, 访问的资源不存在</span>
          <span>
            <RifyButton type="primary" onClick={() => useRouter().navigator({ name: RouteName.HOME })}>
              返回首页
            </RifyButton>
          </span>
        </main>
      </RifyResult>
    </main>
  );
};

export default NOT_FOUND;
