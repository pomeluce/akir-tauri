import useMessage from '@/rify/message/hooks/useMessage';

const Home: React.FC<{}> = () => {
  const message = useMessage();
  console.log(message.success("'Cause you walked hand in hand With another man in my place"));

  return (
    <RifyCard className="h-2000px" title="我是标题">
      <RifyButton onClick={() => message.success("'Cause you walked hand in hand With another man in my place")}>点击</RifyButton>
    </RifyCard>
  );
};

export default Home;
