import loading from '@/components/loading/Loading';
const Home: React.FC<{}> = () => {
  const show = () => {
    loading.show();
    setTimeout(() => {
      loading.close();
    }, 3000);
  };
  return (
    <ArcoCard className="h-[1000px] p-3" title="首页">
      <ArcoButton onClick={show}>点击</ArcoButton>
    </ArcoCard>
  );
};

export default Home;
