import { CSSTransition } from 'react-transition-group';
import './index.scss';

const Home: React.FC<{}> = () => {
  const [inProp, setInProp] = useState(false);
  return (
    <RifyCard className="h-2000px" title="我是标题">
      <RifyButton onClick={() => setInProp(!inProp)}> 切换 </RifyButton>
      <CSSTransition in={inProp} timeout={200} classNames={'my-node'} mountOnEnter unmountOnExit>
        <div className="w-20 h-5 bg-primary2 text-white">{'test --------------- test'}</div>
      </CSSTransition>
    </RifyCard>
  );
};

export default Home;
