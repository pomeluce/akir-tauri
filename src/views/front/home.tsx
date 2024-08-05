import { FlowView } from '@common/components';

const Home: React.FC<{}> = () => {
  return (
    <SuiCard>
      <SuiCardHeader>
        <SuiCardTitle className="pb-3 border-b">
          <header>首页</header>
        </SuiCardTitle>
      </SuiCardHeader>
      <SuiCardContent className="h-[1000px]">
        <FlowView />
      </SuiCardContent>
    </SuiCard>
  );
};

export default Home;
