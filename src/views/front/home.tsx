import { RifyLoading } from '@/rify';

const Home: React.FC<{}> = () => {
  // const [show, setShow] = useState(false);

  const hanlderClick = () => {
    const load = RifyLoading({ isShow: false });
    setTimeout(() => {
      load.show();
      setTimeout(() => {
        load.remove();
      }, 3000);
    }, 3000);
  };

  return (
    <RifyCard className="h-2000px" title="我是标题">
      {/* <RifySpin show={show} description="加载中..."> */}
      {/*   <RifyAlert title="警告" type="warning"> */}
      {/*     不要点击我 */}
      {/*   </RifyAlert> */}
      {/* </RifySpin> */}
      {/* <RifyButton onClick={() => setShow(!show)}>转圈</RifyButton> */}
      <RifyButton onClick={() => hanlderClick()}>转圈</RifyButton>
    </RifyCard>
  );
};

export default Home;
