import Tooltip from '@/rify/tooltip/src/tooltip';

const Home: React.FC<{}> = () => {
  return (
    <RifyCard className="h-2000px" title="我是标题">
      <Tooltip title="tooltip text">
        <RifyButton type="primary">点击</RifyButton>
      </Tooltip>
    </RifyCard>
  );
};

export default Home;
