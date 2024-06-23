import { Success } from '@/components';
import { router } from '@/plugins';

const success: React.FC<{}> = () => {
  const message: string = '提交结果页面用来反馈一系列操作及任务的处理结果, 灰色区域可用来进行一些信息补充';

  return (
    <ArcoCard className="py-5">
      <ArcoResult title={<span className="text-xl">操作成功</span>} subTitle={message} status={null} icon={<Success className="w-20" />}>
        <div className="flex flex-col gap-3 px-10 py-5 rounded bg-backdrop4">
          <span className="block text-center"> 已提交加班申请, 等待直属主管审核 </span>
        </div>
        <section className="flex justify-center gap-3 mt-5">
          <ArcoButton type="primary" status="success" onClick={() => router.navigator({ name: RouteName.HOME })}>
            返回首页
          </ArcoButton>
          <ArcoButton type="outline" status="success">
            查看详情
          </ArcoButton>
        </section>
      </ArcoResult>
    </ArcoCard>
  );
};

export default success;
