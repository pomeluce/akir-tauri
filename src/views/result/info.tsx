import icon from '@/components/_internal/icons/info';

const info: React.FC<{}> = () => {
  const message: string = '本次提交，将在24小时候内自动转入对方账户，如操作失误，请及时撤回';

  const { navigator } = useRouter();

  const opreate: React.FC<{}> = () => {
    return (
      <section className="flex justify-center gap-3">
        <RifyButton type="primary" onClick={() => navigator({ name: RouteName.HOME })}>
          返回首页
        </RifyButton>
        <RifyButton type="primary" ghost>
          查看详情
        </RifyButton>
      </section>
    );
  };

  return (
    <RifyCard className="py-5">
      <RifyResult title="提示信息" message={message} icon={icon({})} footer={opreate({})}>
        <div className="flex flex-col gap-3 px-10 py-5 rounded bg-backdrop4">
          <span> 您提交的内容如下: </span>
          <section className="flex flex-col gap-2 px-3">
            <article className="flex items-center gap-2">
              <IconCheckOne theme="outline" size="20" fill="#337ffe" strokeLinecap="butt" />
              <span>中国建设银行一卡通 (****5426) 转出 2370.00 元, 当前账户余额：￥1980元</span>
              <RifyButton type="primary" text size="small">
                立刻撤回
              </RifyButton>
            </article>
            <article className="flex items-center gap-2">
              <IconCheckOne theme="outline" size="20" fill="#337ffe" strokeLinecap="butt" />
              <span>中国招商银行一卡通 (****8945) 转出 17790.45 元, 当前账户余额：￥80元</span>
              <RifyButton type="primary" text size="small">
                立刻撤回
              </RifyButton>
            </article>
          </section>
        </div>
      </RifyResult>
    </RifyCard>
  );
};

export default info;
