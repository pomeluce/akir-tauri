import icon from '@/components/_internal/icons/failed';

const failed: React.FC<{}> = () => {
  const message: string = '请检查下面的信息是否填写正确, 并进行相应的修改';

  const { navigator } = useRouter();

  const opreate: React.FC<{}> = () => {
    return (
      <section className="flex justify-center gap-3">
        <RifyButton type="error" onClick={() => navigator({ name: RouteName.HOME })}>
          返回首页
        </RifyButton>
        <RifyButton type="error" ghost>
          查看详情
        </RifyButton>
      </section>
    );
  };

  return (
    <RifyCard className="py-5">
      <RifyResult title="操作失败" message={message} icon={<span className="w-24">{icon({})}</span>} opreate={opreate({})}>
        <div className="flex flex-col gap-3 px-10 py-5 rounded bg-gray-200">
          <span> 你提交的内容有如下错误: </span>
          <section className="flex flex-col gap-2 px-3">
            <article className="flex items-center gap-2">
              <IconAttention theme="outline" size="20" fill="#f0a020" strokeLinecap="butt" />
              <span>你的账户已被冻结 </span>
            </article>
            <article className="flex items-center gap-2">
              <IconAttention theme="outline" size="20" fill="#f0a020" strokeLinecap="butt" />
              <span>你的账户还不具备申请资格 </span>
            </article>
          </section>
        </div>
      </RifyResult>
    </RifyCard>
  );
};

export default failed;
