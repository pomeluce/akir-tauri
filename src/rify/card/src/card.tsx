import { useConfig, useTheme } from '../../_mixins';
import { MaybeArray, call, createKey } from '../../_utils';
import { CSSProperties, HTMLAttributes, ReactNode } from 'react';
import { cardLight } from '../styles';
import style from './styles/index.cssr';
import { getPadding } from 'seemly';
import { RifyBaseClose } from '@/rify/_internal';

type CardAttributes = Omit<HTMLAttributes<HTMLElement>, 'title'>;

export interface CardSegmented {
  content?: boolean | 'soft';
  footer?: boolean | 'soft';
  action?: boolean | 'soft';
}

export interface CardProps extends CardAttributes {
  title?: ReactNode;
  className?: string;
  contentClass?: string;
  contentStyle?: CSSProperties;
  headerClass?: string;
  headerStyle?: CSSProperties;
  headerExtraClass?: string;
  headerExtraStyle?: CSSProperties;
  footerClass?: string;
  footerStyle?: CSSProperties;
  embedded?: boolean;
  segmented?: boolean | CardSegmented;
  size?: 'small' | 'medium' | 'large' | 'huge';
  bordered?: boolean;
  closeable?: boolean;
  hoverable?: boolean;
  role?: string;
  onClose?: MaybeArray<() => void>;
  children?: ReactNode;
  cover?: ReactNode;
  footer?: ReactNode;
  action?: ReactNode;
  header?: ReactNode;
  headerExtra?: ReactNode;
}

const card: React.FC<CardProps> = (props: CardProps) => {
  const handleCloseClick = (): void => {
    const { onClose } = props;
    if (onClose) call(onClose);
  };

  const { mergedClsPrefix } = useConfig();
  const theme = useTheme('Card', '-card', style, cardLight, mergedClsPrefix);

  const cssVars = () => {
    const { size = 'medium' } = props;
    const {
      self: {
        color,
        colorModal,
        colorTarget,
        textColor,
        titleTextColor,
        titleFontWeight,
        borderColor,
        actionColor,
        borderRadius,
        lineHeight,
        closeIconColor,
        closeIconColorHover,
        closeIconColorPressed,
        closeColorHover,
        closeColorPressed,
        closeBorderRadius,
        closeIconSize,
        closeSize,
        boxShadow,
        colorPopover,
        colorEmbedded,
        colorEmbeddedModal,
        colorEmbeddedPopover,
        [createKey('padding', size)]: padding,
        [createKey('fontSize', size)]: fontSize,
        [createKey('titleFontSize', size)]: titleFontSize,
      },
      common: { cubicBezierEaseInOut },
    } = theme;

    const { top: paddingTop, left: paddingLeft, bottom: paddingBottom } = getPadding(padding);
    return {
      '--rify-bezier': cubicBezierEaseInOut,
      '--rify-border-radius': borderRadius,
      '--rify-color': color,
      '--rify-color-modal': colorModal,
      '--rify-color-popover': colorPopover,
      '--rify-color-embedded': colorEmbedded,
      '--rify-color-embedded-modal': colorEmbeddedModal,
      '--rify-color-embedded-popover': colorEmbeddedPopover,
      '--rify-color-target': colorTarget,
      '--rify-text-color': textColor,
      '--rify-line-height': lineHeight,
      '--rify-action-color': actionColor,
      '--rify-title-text-color': titleTextColor,
      '--rify-title-font-weight': titleFontWeight,
      '--rify-close-icon-color': closeIconColor,
      '--rify-close-icon-color-hover': closeIconColorHover,
      '--rify-close-icon-color-pressed': closeIconColorPressed,
      '--rify-close-color-hover': closeColorHover,
      '--rify-close-color-pressed': closeColorPressed,
      '--rify-border-color': borderColor,
      '--rify-box-shadow': boxShadow,
      // size
      '--rify-padding-top': paddingTop,
      '--rify-padding-bottom': paddingBottom,
      '--rify-padding-left': paddingLeft,
      '--rify-font-size': fontSize,
      '--rify-title-font-size': titleFontSize,
      '--rify-close-size': closeSize,
      '--rify-close-icon-size': closeIconSize,
      '--rify-close-border-radius': closeBorderRadius,
    };
  };

  const { className, embedded, segmented = false, bordered, hoverable } = props;

  const classes = [
    `${mergedClsPrefix}-card`,
    embedded && `${mergedClsPrefix}-card--embedded`,
    (segmented === true || (segmented !== false && segmented.content)) &&
      `${mergedClsPrefix}-card--content${typeof segmented !== 'boolean' && segmented.content === 'soft' ? '-soft' : ''}-segmented`,
    (segmented === true || (segmented !== false && segmented.footer)) &&
      `${mergedClsPrefix}-card--footer${typeof segmented !== 'boolean' && segmented.footer === 'soft' ? '-soft' : ''}-segmented`,
    (segmented === true || (segmented !== false && segmented.action)) && `${mergedClsPrefix}-card--action-segmented`,
    bordered && `${mergedClsPrefix}-card--bordered`,
    hoverable && `${mergedClsPrefix}-card--hoverable`,
    className || '',
  ]
    .filter(cls => cls)
    .join(' ')
    .trimEnd();

  return (
    <div className={classes} style={cssVars() as CSSProperties} role={props.role}>
      {props.cover && (
        <div className={`${mergedClsPrefix}-card-cover`} role="none">
          {props.cover}
        </div>
      )}
      {props.header || props.closeable || props.title ? (
        <div className={`${mergedClsPrefix}-card-header ${props.headerClass || ''}`.trimEnd()} style={props.headerStyle} role="none">
          <div className={`${mergedClsPrefix}-card-header__main`} role="none">
            {props.header || props.title}
          </div>
          {props.headerExtra && (
            <div className={`${mergedClsPrefix}-card-header__extra ${props.headerExtraClass || ''}`.trimEnd()} style={props.headerExtraStyle}>
              {props.headerExtra}
            </div>
          )}
          {props.closeable && <RifyBaseClose clsPrefix={mergedClsPrefix} className={`${mergedClsPrefix}-card-header__close`} onClick={handleCloseClick} absolute />}
        </div>
      ) : null}
      {props.children && (
        <div className={`${mergedClsPrefix}-card__content ${props.contentClass || ''}`.trimEnd()} style={props.contentStyle} role="none">
          {props.children}
        </div>
      )}
      {props.footer && (
        <div className={`${mergedClsPrefix}-card__footer ${props.footerClass || ''}`.trimEnd()} style={props.footerStyle} role="none">
          {props.footer}
        </div>
      )}
      {props.action && (
        <div className={`${mergedClsPrefix}-card__action ${props.footerClass || ''}`.trimEnd()} role="none">
          {props.action}
        </div>
      )}
    </div>
  );
};

card.defaultProps = { segmented: false, size: 'medium', bordered: true };

if (__DEV__) card.displayName = 'rify-card';

export default card;
