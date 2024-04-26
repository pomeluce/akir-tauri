import { CSSProperties, ReactNode } from 'react';
import { CSSTransition } from 'react-transition-group';
import { RifyBaseLoading } from '../../_internal';
import { changeColor, pxfy } from 'seemly';
import { useConfig, useRtl, useTheme } from '../../_mixins';
import { spinLight } from '../styles';
import { createKey } from '../../_utils';
import style from './styles/index.cssr';
import classNames from 'classnames';

const STROKE_WIDTH = {
  small: 20,
  medium: 18,
  large: 16,
};

export interface SpinProps {
  bgColor?: string;
  className?: string;
  contentClass?: string;
  contentStyle?: CSSProperties;
  description?: string | ReactNode;
  fullscreen?: boolean;
  stroke?: string;
  size?: 'small' | 'medium' | 'large' | number;
  show?: boolean;
  strokeWidth?: number;
  rotate?: boolean;
  delay?: number;
  children?: ReactNode;
  icon?: ReactNode;
}

const spin: React.FC<SpinProps> = props => {
  const {
    bgColor: _bgColor,
    className,
    children,
    contentClass,
    contentStyle,
    delay,
    description,
    fullscreen,
    icon: _icon,
    rotate: _rotate = true,
    show = true,
    stroke,
    strokeWidth,
  } = props;

  const { mergedClsPrefix, mergedRtl } = useConfig();
  const theme = useTheme('Spin', '-spin', style, spinLight, mergedClsPrefix);
  const rtlEnabled = useRtl('Spin', mergedRtl, mergedClsPrefix);

  const cssVars = () => {
    const { size: spinSize = 'medium' } = props;
    const {
      common: { cubicBezierEaseInOut },
      self,
    } = theme;
    const { opacitySpinning, color, textColor, bgColor } = self;
    const size = typeof spinSize === 'number' ? pxfy(spinSize) : self[createKey('size', spinSize)];

    const mergedBgColor = _bgColor || changeColor(bgColor, { alpha: 0.25 });

    return {
      '--rify-bezier': cubicBezierEaseInOut,
      '--rify-opacity-spinning': opacitySpinning,
      '--rify-size': size,
      '--rify-color': color,
      '--rify-text-color': textColor,
      '--rify-mask-color': mergedBgColor,
    };
  };

  const [active, setActive] = useState<boolean>(false);

  useEffect(() => {
    let timerId: number;

    if (show) {
      if (delay) {
        timerId = setTimeout(() => {
          setActive(true);
        }, delay);

        return () => {
          clearTimeout(timerId);
        };
      }
    }
    setActive(show);

    // Clean-up function when compitableShow changes
    return () => {
      clearTimeout(timerId);
    };
  }, [show, delay]);

  const mergedStrokeWidth = () => {
    if (strokeWidth !== undefined) return strokeWidth;
    const { size = 'medium' } = props;
    return STROKE_WIDTH[typeof size === 'number' ? 'medium' : size];
  };
  const rotate = _icon && _rotate;

  const descriptionNode = description && <div className={`${mergedClsPrefix}-spin-description`}>{description}</div>;

  const icon = _icon ? (
    <div className={`${mergedClsPrefix}-spin-body`}>
      <div
        className={classNames(`${mergedClsPrefix}-spin`, { [`${mergedClsPrefix}-spin-rtl`]: rtlEnabled, [`${mergedClsPrefix}-spin--rotate`]: rotate })}
        style={children ? undefined : (cssVars() as CSSProperties)}
      >
        {_icon}
      </div>
      {descriptionNode}
    </div>
  ) : (
    <div className={`${mergedClsPrefix}-spin-body`}>
      <RifyBaseLoading
        clsPrefix={mergedClsPrefix}
        className={classNames(`${mergedClsPrefix}-spin`, rtlEnabled && `${mergedClsPrefix}-spin-rtl`)}
        style={children ? undefined : (cssVars() as CSSProperties)}
        stroke={stroke}
        strokeWidth={mergedStrokeWidth()}
      />
      {descriptionNode}
    </div>
  );

  return children ? (
    <div className={classNames([`${mergedClsPrefix}-spin-container`, className])} style={cssVars() as CSSProperties}>
      <div
        className={classNames([
          `${mergedClsPrefix}-spin-content`,
          active && `${mergedClsPrefix}-spin-content--spinning`,
          fullscreen && `${mergedClsPrefix}-spin-content--fullscreen`,
          contentClass,
        ])}
        style={contentStyle}
      >
        {children}
        <div className={`${mergedClsPrefix}-spin-content__mask`}></div>
      </div>
      {active && (
        <CSSTransition classNames="fade-in-transition" in timeout={1000}>
          {active ? icon : null}
        </CSSTransition>
      )}
    </div>
  ) : (
    icon
  );
};

if (__DEV__) spin.displayName = 'rify-spin';

export default spin;
