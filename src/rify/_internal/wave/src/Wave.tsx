import useStyle from '@/rify/_mixins/use-style';
import style from './styles/index.cssr';
import { ForwardedRef } from 'react';

export interface BaseWaveRef extends HTMLDivElement {
  play: () => void;
}

const wave: React.ForwardRefRenderFunction<BaseWaveRef, { clsPrefix: string }> = (props, ref: ForwardedRef<BaseWaveRef>) => {
  useStyle('-base-wave', style, props.clsPrefix);
  let animationTimerId: number | null = null;
  const [active, setActive] = useState(false);

  const play = () => {
    if (animationTimerId !== null) {
      window.clearTimeout(animationTimerId);
      setActive(false);
      animationTimerId = null;
    }

    setTimeout(() => {
      setActive(true);
    }, 0);

    animationTimerId = setTimeout(() => {
      setActive(false);
      animationTimerId = null;
    }, 1000);
  };

  // 将 play 函数暴露出去
  useImperativeHandle(ref, () => ({ play }) as BaseWaveRef, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className={[`${props.clsPrefix}-base-wave`, active && `${props.clsPrefix}-base-wave--active`]
        .filter(cls => cls)
        .join(' ')
        .trimEnd()}
    />
  );
};

export default forwardRef(wave);
