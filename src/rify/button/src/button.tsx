import type { CSSProperties, KeyboardEvent, MouseEvent, ReactNode } from 'react';
import type { MaybeArray } from '../../_utils';
import type { BaseWaveRef } from '../../_internal';
import type { Size, Type } from './interface';
import { useTheme, useConfig } from '../../_mixins';
import { call, createKey, createHoverColor, createPressedColor, isSafari, warnOnce } from '../../_utils';
import { RifyBaseLoading, RifyBaseWave } from '../../_internal';
import { buttonLight } from '../styles';
import { changeColor } from 'seemly';
import style from './styles/index.cssr';

export interface ButtonProps {
  color?: string;
  textColor?: string;
  text?: boolean;
  block?: boolean;
  loading?: boolean;
  disabled?: boolean;
  circle?: boolean;
  size?: Size;
  ghost?: boolean;
  round?: boolean;
  secondary?: boolean;
  tertiary?: boolean;
  quaternary?: boolean;
  strong?: boolean;
  focusable?: boolean;
  keyboard?: boolean;
  type?: Type;
  dashed?: boolean;
  icon?: ReactNode;
  iconPlacement?: 'left' | 'right';
  attrType?: 'button' | 'submit' | 'reset';
  bordered?: boolean;
  children?: ReactNode;
  onClick?: MaybeArray<(event: MouseEvent) => void>;
  nativeFocusBehavior?: boolean;
}

const button: React.FC<ButtonProps> = (props: ButtonProps) => {
  if (__DEV__) {
    useEffect(() => {
      const { dashed, text, ghost, secondary, tertiary, quaternary } = props;
      if ((dashed || ghost || text) && (secondary || tertiary || quaternary)) {
        warnOnce('button', "`dashed`,`ghost` and `text` props can't be used along with `secondary`, `tertiary` and `quaternary` props.");
      }
    }, [props]);
  }
  const selfElRef = createRef<HTMLButtonElement>();
  const waveElRef = createRef<BaseWaveRef>();
  const [enterPressed, setEnterPressed] = useState(false);

  const showBorder = !props.quaternary && !props.tertiary && !props.secondary && !props.text && (!props.color || props.ghost || props.dashed) && props.bordered;
  const size = props.size ?? 'medium';
  const type = props.type ?? 'primary';
  const iconPlacement = props.iconPlacement ?? 'left';
  const focusable = props.focusable && !props.disabled;

  // 鼠标按下事件
  const handleMousedown = (e: MouseEvent): void => {
    if (!focusable) e.preventDefault();
    if (props.nativeFocusBehavior) return;
    e.preventDefault();
    if (props.disabled) return;
    if (focusable) selfElRef.current?.focus({ preventScroll: true });
  };
  // 单击事件
  const handleClick = (e: MouseEvent): void => {
    if (!props.disabled && !props.loading) {
      const { onClick } = props;
      if (onClick) call(onClick, e);
      if (!props.text) {
        waveElRef.current?.play();
      }
    }
  };
  const handleKeyup = (e: KeyboardEvent): void => {
    switch (e.key) {
      case 'Enter':
        if (!props.keyboard) return;
        setEnterPressed(false);
    }
  };
  const handleKeydown = (e: KeyboardEvent): void => {
    switch (e.key) {
      case 'Enter':
        if (!props.keyboard || props.loading) {
          e.preventDefault();
          return;
        }
        setEnterPressed(true);
    }
  };
  // 失焦事件
  const handleBlur = (): void => {
    setEnterPressed(false);
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

    const { text, textColor, color, strong, ghost, secondary, tertiary, quaternary, circle, round, dashed } = props;

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
    } else if (ghost || dashed) {
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

  const classes = [
    `${mergedClsPrefix}-button`,
    `${mergedClsPrefix}-button--${type}-type`,
    `${mergedClsPrefix}-button--${size}-type`,
    props.disabled && `${mergedClsPrefix}-button--disabled`,
    props.block && `${mergedClsPrefix}-button--block`,
    enterPressed && `${mergedClsPrefix}-button--pressed`,
    !props.text && props.dashed && `${mergedClsPrefix}-button--dashed`,
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
    <button
      ref={selfElRef}
      className={classes}
      tabIndex={focusable ? 0 : -1}
      type={props.attrType}
      style={cssVars() as CSSProperties}
      disabled={props.disabled}
      onClick={handleClick}
      onBlur={handleBlur}
      onMouseDown={handleMousedown}
      onKeyUp={handleKeyup}
      onKeyDown={handleKeydown}
    >
      {iconPlacement === 'right' && children()}
      {(props.icon || props.loading) && (
        <span className={`${mergedClsPrefix}-button__icon`}>
          {props.loading ? (
            <RifyBaseLoading clsPrefix={mergedClsPrefix} key="loading" className={`${mergedClsPrefix}-icon-slot`} strokeWidth={20} />
          ) : (
            <div key="icon" className={`${mergedClsPrefix}-icon-slot`} role="none">
              {props.icon ?? props.icon}
            </div>
          )}
        </span>
      )}
      {iconPlacement === 'left' && children()}
      {!props.text ? <RifyBaseWave ref={waveElRef} clsPrefix={mergedClsPrefix} /> : null}
      {showBorder ? <div aria-hidden className={`${mergedClsPrefix}-button__border`} style={customColorCssVars() as CSSProperties} /> : null}
      {showBorder ? <div aria-hidden className={`${mergedClsPrefix}-button__state-border`} style={customColorCssVars() as CSSProperties} /> : null}
    </button>
  );
};

button.defaultProps = { focusable: true, keyboard: true, type: 'default', iconPlacement: 'left', attrType: 'button', bordered: true, nativeFocusBehavior: !isSafari };
if (__DEV__) button.displayName = 'rify-button';

export default button;
