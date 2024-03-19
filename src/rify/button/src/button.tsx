import { HTMLAttributes, MouseEvent, ReactNode } from 'react';
import { ThemeCommonVars } from '../../_styles/common';
import { useTheme, defaultClsPrefix } from '../../_mixins';
import { createKey, warnOnce } from '../../_utils';
import style from './styles/index.cssr';
import { buttonLight } from '../styles';

type ButtonAttributes = Omit<HTMLAttributes<HTMLButtonElement>, 'text'>;

export interface ButtonProps extends ButtonAttributes {
  type?: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info';
  size?: 'tiny' | 'small' | 'medium' | 'large';
  text?: boolean;
  textColor?: string;
  ghost?: boolean;
  secondary?: boolean;
  disabled?: boolean;
  focusable?: boolean;
  color?: string;
  circle?: boolean;
  round?: boolean;
  loading?: boolean;
  strong?: boolean;
  icon?: ReactNode;
  children?: ReactNode;
  onClick?: (event: MouseEvent) => void;
}

const button: React.FC<ButtonProps> = (props: ButtonProps) => {
  if (import.meta.env.MODE === 'dev') {
    useEffect(() => {
      const { text, ghost, secondary } = props;
      if ((ghost || text) && secondary) {
        warnOnce('button', "`ghost` and `text` props can't be used along with `secondary` props.");
      }
    }, [props]);
  }

  const showBorder: boolean = !props.secondary && !props.text && (!props.color || props.ghost) && props.border;
  const mergedSize = props.size ?? 'medium';
  const mergedFocusable = props.focusable && !props.disabled;

  // 挂载样式
  const { common } = useTheme('Button', '-button', style, buttonLight, defaultClsPrefix);
  // const { common } = theme as { common: ThemeCommonVars };
  const { fontWeight, fontWeightStrong } = common;

  const { type, text, textColor, color, strong } = props;

  // font
  const fontProps = {
    'font-weight': strong ? fontWeightStrong : fontWeight,
  };

  // color
  let colorProps = {
    '--rify-color': 'initial',
    '--rify-color-hover': 'initial',
    '--rify-color-pressed': 'initial',
    '--rify-color-focus': 'initial',
    '--rify-color-disabled': 'initial',
    '--rify-ripple-color': 'initial',
    '--rify-text-color': 'initial',
    '--rify-text-color-hover': 'initial',
    '--rify-text-color-pressed': 'initial',
    '--rify-text-color-focus': 'initial',
    '--rify-text-color-disabled': 'initial',
  };

  const mergedType = type === 'default' ? 'default' : type;

  if (text) {
    const propTextColor = textColor || color;
    const mergedTextColor = propTextColor || common[createKey('textColorText', mergedType)];
  }

  // const { type = 'default', size = 'medium', text, ghost, secondary, disabled, color, circle, round, loading, children, icon, className, style, onClick, ...attributes } = props;
  //
  // const ref = useRef<HTMLButtonElement>(null);
  // const { compositor, hexToRgba, rgbToHex, textColor } = useColor();
  //
  // let cssProps = {
  //   '--rify-btn-color': color,
  //   '--rify-btn-color-hover': color ? rgbToHex(compositor(color, 'rgba(255, 255, 255, 0.16)')) : '',
  //   '--rify-btn-color-pressed': color ? rgbToHex(compositor(color, 'rgba(0, 0, 0, 0.12)')) : '',
  //   '--rify-btn-text-color': color ? textColor(color, '#fff', '') : '',
  //   '--rify-btn-secondary-color': color ? hexToRgba(color, 0.16) : '',
  //   '--rify-btn-secondary-color-hover': color ? hexToRgba(color, 0.22) : '',
  //   '--rify-btn-secondary-color-pressed': color ? hexToRgba(color, 0.28) : '',
  //   '--rify-btn-animation-color': '#0066ff',
  //   ...style,
  // } as CSSProperties;
  //
  // const classes = `rify-button rify-btn rify-btn-${type} rify-btn-size--${size}${text ? ' rify-btn-text' : ''}${ghost ? ' rify-btn-ghost' : ''}
  //                 ${secondary ? ' rify-btn-secondary' : ''}${disabled ? ' rify-btn-disabled' : ''}${color ? ' rify-btn-color' : ''}
  //                 ${circle ? ' rify-btn-circle' : ''}${round ? ' rify-btn-round' : ''}${loading ? ' rify-btn--loading' : ''}${className ?? ''}`.trimEnd();
  //

  return (
    // <button ref={ref} className={classes} type="button" disabled={disabled} style={cssProps} onClick={event => !loading && onClick?.(event)} {...attributes}>
    <button>
      {/* {icon && !loading && <span className="rify-btn__icon">{icon}</span>} */}
      {/* {loading && ( */}
      {/*   <span className="rify-btn__loading"> */}
      {/*     <IconLoadingFour /> */}
      {/*   </span> */}
      {/* )} */}
      {/* <span className="rify-btn__content">{children}</span> */}
      {/* <div className="rify-btn__wave"></div> */}
    </button>
  );
};

button.defaultProps = { focusable: true };

if (import.meta.env.MODE !== 'pro') button.displayName = 'rify-button';

export default button;
