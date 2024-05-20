import { Info } from '@/components';

const info: React.FC<{}> = () => {
  const message: string = '本次提交，将在24小时候内自动转入对方账户，如操作失误，请及时撤回';

  return (
    <ArcoCard className="py-5">
      <ArcoResult title={<span className="text-xl">提示信息</span>} subTitle={message} status={null} icon={<Info className="w-20" />}>
        <div className="flex flex-col gap-3 px-10 py-5 rounded bg-backdrop4">
          <span> 您提交的内容如下: </span>
          <section className="flex flex-col gap-2 px-3">
            <article className="flex items-center gap-2">
              <IconCheckboxCircleLine size="20" color="#337ffe" strokeLinecap="butt" />
              <span>中国建设银行一卡通 (****5426) 转出 2370.00 元, 当前账户余额：￥1980元</span>
              <ArcoButton type="text" size="small">
                立刻撤回
              </ArcoButton>
            </article>
            <article className="flex items-center gap-2">
              <IconCheckboxCircleLine size="20" color="#337ffe" strokeLinecap="butt" />
              <span>中国招商银行一卡通 (****8945) 转出 17790.45 元, 当前账户余额：￥80元</span>
              <ArcoButton type="text" size="small">
                立刻撤回
              </ArcoButton>
            </article>
          </section>
        </div>
        <section className="flex justify-center gap-3 mt-5">
          <ArcoButton type="primary" onClick={() => useRouter().navigator({ name: RouteName.HOME })}>
            返回首页
          </ArcoButton>
          <ArcoButton type="outline">查看详情</ArcoButton>
        </section>
      </ArcoResult>
    </ArcoCard>
  );
};

export default info;
