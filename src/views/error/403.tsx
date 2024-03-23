import icon from '@/components/_internal/icons/403';

const FORBIDDEN: React.FC<{}> = () => {
  return (
    <main className="h-screen flex flex-col justify-center items-center">
      <RifyResult className="w-full" icon={<span className="w-74">{icon({})}</span>}>
        <main className="flex flex-col justify-center items-center gap-7 pb-48">
          <span className="text-base md:text-3xl font-bold ">当前资源需要授权访问哦!</span>
          <span>
            <RifyButton type="warning" onClick={() => useRouter().navigator({ name: RouteName.HOME })}>
              返回首页
            </RifyButton>
          </span>
        </main>
      </RifyResult>
    </main>
  );
};

export default FORBIDDEN;
