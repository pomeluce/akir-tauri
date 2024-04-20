import useMessage from '@/rify/message/hooks/useMessage';

const Home: React.FC<{}> = () => {
  const message = useMessage();
  return (
    <RifyCard className="h-2000px" title="我是标题">
      <RifyButton type="primary" onClick={() => message.success('成功', { closable: true, keepAliveOnHover: true })}>
        成功
      </RifyButton>
    </RifyCard>
  );
};

export default Home;
