import { useMessage } from '@/rify';

const Home: React.FC<{}> = () => {
  const handleClick = async () => {
    useMessage().success('这是成功消息');
  };
  return (
    <RifyCard className="h-2000px" title="首页">
      <RifyButton onClick={handleClick}> info </RifyButton>
    </RifyCard>
  );
};

export default Home;
