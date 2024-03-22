import { RefAttributes } from 'react';
import useStyle from '@/rify/_mixins/use-style';
import style from './styles/index.cssr';

export interface BaseWaveRef extends HTMLDivElement {
  play: () => void;
}

const wave: React.FC<{ clsPrefix: string }> = props => {
  useStyle('-base-wave', style, props.clsPrefix);
  let animationTimerId: number | null = null;
  const [active, setActive] = useState(true);
  const play = () => {
    if (animationTimerId !== null) {
      window.clearTimeout(animationTimerId);
      setActive(false);
      animationTimerId = null;
    }

    setActive(true);
    animationTimerId = setTimeout(() => {
      setActive(false);
      animationTimerId = null;
    }, 1000);
  };
  return (
    <div
      aria-hidden
      className={[`${props.clsPrefix}-base-wave`,  active && `${props.clsPrefix}-base-wave--active`]
        .filter(cls => cls)
        .join(' ')
        .trimEnd()}
    />
  );
};

export default wave;
