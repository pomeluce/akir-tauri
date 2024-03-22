import { CSSProperties, HTMLAttributes, MouseEvent, ReactNode } from 'react';
import { useTheme, useConfig } from '../../_mixins';
import { createHoverColor, createPressedColor } from '../../_utils/color';
import { call, createKey, warnOnce } from '../../_utils';
import style from './styles/index.cssr';
import { buttonLight } from '../styles';
import { changeColor } from 'seemly';
import { RifyBaseWave } from '@/rify/_internal';

type ButtonAttributes = Omit<HTMLAttributes<HTMLButtonElement>, 'text'>;

export interface ButtonProps extends ButtonAttributes {
  type?: 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info';
  size?: 'tiny' | 'small' | 'medium' | 'large';
  text?: boolean;
  textColor?: string;
  ghost?: boolean;
  secondary?: boolean;
  tertiary?: boolean;
  quaternary?: boolean;
  disabled?: boolean;
  focusable?: boolean;
  color?: string;
  circle?: boolean;
  round?: boolean;
  loading?: boolean;
  strong?: boolean;
  bordered?: boolean;
  icon?: ReactNode;
  iconPlacement?: 'left' | 'right';
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

  const showBorder = !props.quaternary && !props.tertiary && !props.secondary && !props.text && (!props.color || props.ghost) && props.bordered;
  const size = props.size ?? 'medium';
  const type = props.type ?? 'primary';
  const iconPlacement = props.iconPlacement ?? 'left';
  const focusable = props.focusable && !props.disabled;

  const handleClick = (e: MouseEvent): void => {
    if (!props.disabled && !props.loading) {
      const { onClick } = props;
      if (onClick) call(onClick, e);
      if (!props.text) {
        // waveElRef.current?.play();
      }
    }
  };

  // 挂载样式
  const { mergedClsPrefix } = useConfig();
  const theme = useTheme('Button', '-button', style, buttonLight, mergedClsPrefix);

  const cssVars = () => {
    const {
      common: { cubicBezierEaseInOut, cubicBezierEaseOut },
      self,
    } = theme;
    const { rippleDuration, opacityDisabled, fontWeight, fontWeightStrong } = self;

    const { text, textColor, color, strong, ghost, secondary, tertiary, quaternary, circle, round } = props;

    // font
    const fontProps = {
      fontWeight: strong ? fontWeightStrong : fontWeight,
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
    const typeIsDefault = type === 'default';
    if (text) {
      const propTextColor = textColor || color;
      const mergedTextColor = propTextColor || self[createKey('textColorText', type)];
      colorProps = {
        '--rify-color': '#0000',
        '--rify-color-hover': '#0000',
        '--rify-color-pressed': '#0000',
        '--rify-color-focus': '#0000',
        '--rify-color-disabled': '#0000',
        '--rify-ripple-color': '#0000',
        '--rify-text-color': mergedTextColor,
        '--rify-text-color-hover': propTextColor ? createHoverColor(propTextColor) : self[createKey('textColorTextHover', type)],
        '--rify-text-color-pressed': propTextColor ? createPressedColor(propTextColor) : self[createKey('textColorTextPressed', type)],
        '--rify-text-color-focus': propTextColor ? createHoverColor(propTextColor) : self[createKey('textColorTextHover', type)],
        '--rify-text-color-disabled': propTextColor || self[createKey('textColorTextDisabled', type)],
      };
    } else if (ghost) {
      const mergedTextColor = textColor || color;
      colorProps = {
        '--rify-color': '#0000',
        '--rify-color-hover': '#0000',
        '--rify-color-pressed': '#0000',
        '--rify-color-focus': '#0000',
        '--rify-color-disabled': '#0000',
        '--rify-ripple-color': color || self[createKey('rippleColor', type)],
        '--rify-text-color': mergedTextColor || self[createKey('textColorGhost', type)],
        '--rify-text-color-hover': mergedTextColor ? createHoverColor(mergedTextColor) : self[createKey('textColorGhostHover', type)],
        '--rify-text-color-pressed': mergedTextColor ? createPressedColor(mergedTextColor) : self[createKey('textColorGhostPressed', type)],
        '--rify-text-color-focus': mergedTextColor ? createHoverColor(mergedTextColor) : self[createKey('textColorGhostHover', type)],
        '--rify-text-color-disabled': mergedTextColor || self[createKey('textColorGhostDisabled', type)],
      };
    } else if (secondary) {
      const typeTextColor = typeIsDefault ? self.textColor : self[createKey('color', type)];
      const mergedTextColor = color || typeTextColor;
      const isColoredType = type !== 'default';
      colorProps = {
        '--rify-color': isColoredType ? changeColor(mergedTextColor, { alpha: Number(self.colorOpacitySecondary) }) : self.colorSecondary,
        '--rify-color-hover': isColoredType ? changeColor(mergedTextColor, { alpha: Number(self.colorOpacitySecondaryHover) }) : self.colorSecondaryHover,
        '--rify-color-pressed': isColoredType ? changeColor(mergedTextColor, { alpha: Number(self.colorOpacitySecondaryPressed) }) : self.colorSecondaryPressed,
        '--rify-color-focus': isColoredType ? changeColor(mergedTextColor, { alpha: Number(self.colorOpacitySecondaryHover) }) : self.colorSecondaryHover,
        '--rify-color-disabled': self.colorSecondary,
        '--rify-ripple-color': '#0000',
        '--rify-text-color': mergedTextColor,
        '--rify-text-color-hover': mergedTextColor,
        '--rify-text-color-pressed': mergedTextColor,
        '--rify-text-color-focus': mergedTextColor,
        '--rify-text-color-disabled': mergedTextColor,
      };
    } else if (tertiary || quaternary) {
      const typeColor = typeIsDefault ? self.textColor : self[createKey('color', type)];
      const mergedColor = color || typeColor;
      if (tertiary) {
        colorProps['--rify-color'] = self.colorTertiary;
        colorProps['--rify-color-hover'] = self.colorTertiaryHover;
        colorProps['--rify-color-pressed'] = self.colorTertiaryPressed;
        colorProps['--rify-color-focus'] = self.colorSecondaryHover;
        colorProps['--rify-color-disabled'] = self.colorTertiary;
      } else {
        colorProps['--rify-color'] = self.colorQuaternary;
        colorProps['--rify-color-hover'] = self.colorQuaternaryHover;
        colorProps['--rify-color-pressed'] = self.colorQuaternaryPressed;
        colorProps['--rify-color-focus'] = self.colorQuaternaryHover;
        colorProps['--rify-color-disabled'] = self.colorQuaternary;
      }
      colorProps['--rify-ripple-color'] = '#0000';
      colorProps['--rify-text-color'] = mergedColor;
      colorProps['--rify-text-color-hover'] = mergedColor;
      colorProps['--rify-text-color-pressed'] = mergedColor;
      colorProps['--rify-text-color-focus'] = mergedColor;
      colorProps['--rify-text-color-disabled'] = mergedColor;
    } else {
      colorProps = {
        '--rify-color': color || self[createKey('color', type)],
        '--rify-color-hover': color ? createHoverColor(color) : self[createKey('colorHover', type)],
        '--rify-color-pressed': color ? createPressedColor(color) : self[createKey('colorPressed', type)],
        '--rify-color-focus': color ? createHoverColor(color) : self[createKey('colorFocus', type)],
        '--rify-color-disabled': color || self[createKey('colorDisabled', type)],
        '--rify-ripple-color': color || self[createKey('rippleColor', type)],
        '--rify-text-color': textColor || (color ? self.textColorPrimary : self[createKey('textColor', type)]),
        '--rify-text-color-hover': textColor || (color ? self.textColorHoverPrimary : self[createKey('textColorHover', type)]),
        '--rify-text-color-pressed': textColor || (color ? self.textColorPressedPrimary : self[createKey('textColorPressed', type)]),
        '--rify-text-color-focus': textColor || (color ? self.textColorFocusPrimary : self[createKey('textColorFocus', type)]),
        '--rify-text-color-disabled': textColor || (color ? self.textColorDisabledPrimary : self[createKey('textColorDisabled', type)]),
      };
    }
    // border
    let borderProps = {
      '--rify-border': 'initial',
      '--rify-border-hover': 'initial',
      '--rify-border-pressed': 'initial',
      '--rify-border-focus': 'initial',
      '--rify-border-disabled': 'initial',
    };
    if (text) {
      borderProps = {
        '--rify-border': 'none',
        '--rify-border-hover': 'none',
        '--rify-border-pressed': 'none',
        '--rify-border-focus': 'none',
        '--rify-border-disabled': 'none',
      };
    } else {
      borderProps = {
        '--rify-border': self[createKey('border', type)],
        '--rify-border-hover': self[createKey('borderHover', type)],
        '--rify-border-pressed': self[createKey('borderPressed', type)],
        '--rify-border-focus': self[createKey('borderFocus', type)],
        '--rify-border-disabled': self[createKey('borderDisabled', type)],
      };
    }
    // size
    const {
      [createKey('height', size)]: height,
      [createKey('fontSize', size)]: fontSize,
      [createKey('padding', size)]: padding,
      [createKey('paddingRound', size)]: paddingRound,
      [createKey('iconSize', size)]: iconSize,
      [createKey('borderRadius', size)]: borderRadius,
      [createKey('iconMargin', size)]: iconMargin,
      waveOpacity,
    } = self;
    const sizeProps = {
      '--rify-width': circle && !text ? height : 'initial',
      '--rify-height': text ? 'initial' : height,
      '--rify-font-size': fontSize,
      '--rify-padding': circle ? 'initial' : text ? 'initial' : round ? paddingRound : padding,
      '--rify-icon-size': iconSize,
      '--rify-icon-margin': iconMargin,
      '--rify-border-radius': text ? 'initial' : circle || round ? height : borderRadius,
    };
    return {
      '--rify-bezier': cubicBezierEaseInOut,
      '--rify-bezier-ease-out': cubicBezierEaseOut,
      '--rify-ripple-duration': rippleDuration,
      '--rify-opacity-disabled': opacityDisabled,
      '--rify-wave-opacity': waveOpacity,
      ...fontProps,
      ...colorProps,
      ...borderProps,
      ...sizeProps,
    };
  };
  const customColorCssVars = () => {
    const { color } = props;
    if (!color) return null;
    const hoverColor = createHoverColor(color);
    return {
      '--rify-border-color': color,
      '--rify-border-color-hover': hoverColor,
      '--rify-border-color-pressed': createPressedColor(color),
      '--rify-border-color-focus': hoverColor,
      '--rify-border-color-disabled': color,
    };
  };
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

  const classes = [
    `${mergedClsPrefix}-button`,
    `${mergedClsPrefix}-button--${type}-type`,
    `${mergedClsPrefix}-button--${size}-type`,
    props.disabled && `${mergedClsPrefix}-button--disabled`,
    props.color && `${mergedClsPrefix}-button--color`,
    props.secondary && `${mergedClsPrefix}-button--secondary`,
    props.loading && `${mergedClsPrefix}-button--loading`,
    props.ghost && `${mergedClsPrefix}-button--ghost`,
  ]
    .filter(cls => cls)
    .join(' ')
    .trimEnd();

  const children = () => {
    return <span className={`${mergedClsPrefix}-button__content`}>{props.children}</span>;
  };

  return (
    // <button ref={ref} className={classes} type="button" disabled={disabled} style={cssProps} onClick={event => !loading && onClick?.(event)} {...attributes}>
    <button className={classes} style={cssVars() as CSSProperties} disabled={props.disabled} onClick={handleClick}>
      {/* {loading && ( */}
      {/*   <span className="rify-btn__loading"> */}
      {/*     <IconLoadingFour /> */}
      {/*   </span> */}
      {/* )} */}
      {/* <span className="rify-btn__content">{children}</span> */}
      {/* <div className="rify-btn__wave"></div> */}
      {iconPlacement === 'right' && children()}
      {(props.icon || props.loading) && (
        <span className={`${mergedClsPrefix}-button__icon`}>
          {props.loading ? (
            <div></div>
          ) : (
            <div key="icon" className={`${mergedClsPrefix}-icon-slot`} role="none">
              {props.icon ?? props.icon}
            </div>
          )}
        </span>
      )}
      {iconPlacement === 'left' && children()}
      {!props.text ? <RifyBaseWave clsPrefix={mergedClsPrefix} /> : null}
      {showBorder ? <div aria-hidden className={`${mergedClsPrefix}-button__border`} style={customColorCssVars() as CSSProperties} /> : null}
      {showBorder ? <div aria-hidden className={`${mergedClsPrefix}-button__state-border`} style={customColorCssVars() as CSSProperties} /> : null}
    </button>
  );
};

button.defaultProps = { size: 'medium', type: 'default', iconPlacement: 'left', focusable: true, bordered: true };

if (import.meta.env.MODE !== 'pro') button.displayName = 'rify-button';

export default button;
