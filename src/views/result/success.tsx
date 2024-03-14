import icon from '@/components/_internal/icons/success';

const success: React.FC<{}> = () => {
  const message: string = '提交结果页面用来反馈一系列操作及任务的处理结果, 灰色区域可用来进行一些信息补充';

  const { navigator } = useRouter();

  const opreate: React.FC<{}> = () => {
    return (
      <section className="flex justify-center gap-3">
        <RifyButton type="success" onClick={() => navigator({ name: RouteName.HOME })}>
          返回首页
        </RifyButton>
        <RifyButton type="success" ghost>
          查看详情
        </RifyButton>
      </section>
    );
  };

  return (
    <RifyCard className="py-5">
      <RifyResult title="操作成功" message={message} icon={<span className="w-24">{icon({})}</span>} opreate={opreate({})}>
        <div className="flex flex-col gap-3 px-10 py-5 rounded bg-gray-200">
          <span className="block text-center"> 已提交加班申请, 等待直属主管审核 </span>
        </div>
      </RifyResult>
    </RifyCard>
  );
};

export default success;
