import Tooltip from '@/rify/tooltip/src/tooltip';

const Home: React.FC<{}> = () => {
  return (
    <RifyCard className="h-2000px" title="我是标题">
      <Tooltip title="tooltip text">
        <button>点击</button>
      </Tooltip>
    </RifyCard>
  );
};

export default Home;
