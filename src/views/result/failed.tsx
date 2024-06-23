import { Failed } from '@/components';
import { router } from '@/plugins';

const failed: React.FC<{}> = () => {
  const message: string = '请检查下面的信息是否填写正确, 并进行相应的修改';

  return (
    <ArcoCard className="py-5">
      <ArcoResult title={<span className="text-xl">操作失败</span>} subTitle={message} status={null} icon={<Failed className="w-20" />}>
        <div className="flex flex-col gap-3 px-10 py-5 rounded bg-backdrop4">
          <span> 你提交的内容有如下错误: </span>
          <section className="flex flex-col gap-2 px-3">
            <article className="flex items-center gap-2">
              <IconRiErrorWarningLine size="20" fill="#f0a020" strokeLinecap="butt" />
              <span>你的账户已被冻结 </span>
            </article>
            <article className="flex items-center gap-2">
              <IconRiErrorWarningLine size="20" fill="#f0a020" strokeLinecap="butt" />
              <span>你的账户还不具备申请资格 </span>
            </article>
          </section>
        </div>
        <section className="flex justify-center gap-3 mt-10">
          <ArcoButton type="primary" status="danger" onClick={() => router.navigator({ name: RouteName.HOME })}>
            返回首页
          </ArcoButton>
          <ArcoButton type="outline" status="danger">
            查看详情
          </ArcoButton>
        </section>
      </ArcoResult>
    </ArcoCard>
  );
};

export default failed;
