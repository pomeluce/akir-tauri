import { CSSProperties, ReactNode } from 'react';
import { MessageContext, MessageProviderSetupProps } from './message-context';
import { MessageProps } from './message-props';
import { MessageRenderMessage, MessageType } from './types';
import { ErrorIcon, InfoIcon, RifyBaseClose, RifyBaseIcon, RifyBaseLoading, SuccessIcon, WarningIcon } from '../../_internal';
import { useConfig, useRtl, useTheme } from '../../_mixins';
import { messageLight } from '../styles';
import { createKey, render } from '../../_utils';
import style from './styles/index.cssr';
import classNames from 'classnames';

const iconRenderMap = {
  info: () => <InfoIcon />,
  success: () => <SuccessIcon />,
  warning: () => <WarningIcon />,
  error: () => <ErrorIcon />,
  default: () => null,
};

const message: React.FC<MessageProps & { render?: MessageRenderMessage }> = props => {
  const { closable, content, icon, onMouseenter, onMouseleave, render: renderMessage, showIcon, type = 'default' } = props;

  const { mergedClsPrefix, mergedRtl } = useConfig();
  const theme = useTheme('Message', '-message', style, messageLight, mergedClsPrefix);
  const rtlEnabled = useRtl('Message', mergedRtl, mergedClsPrefix);

  const cssVars = () => {
    const {
      common: { cubicBezierEaseInOut },
      self: {
        padding,
        margin,
        maxWidth,
        iconMargin,
        closeMargin,
        closeSize,
        iconSize,
        fontSize,
        lineHeight,
        borderRadius,
        iconColorInfo,
        iconColorSuccess,
        iconColorWarning,
        iconColorError,
        iconColorLoading,
        closeIconSize,
        closeBorderRadius,
        [createKey('textColor', type)]: textColor,
        [createKey('boxShadow', type)]: boxShadow,
        [createKey('color', type)]: color,
        [createKey('closeColorHover', type)]: closeColorHover,
        [createKey('closeColorPressed', type)]: closeColorPressed,
        [createKey('closeIconColor', type)]: closeIconColor,
        [createKey('closeIconColorPressed', type)]: closeIconColorPressed,
        [createKey('closeIconColorHover', type)]: closeIconColorHover,
      },
    } = theme;
    return {
      '--rify-bezier': cubicBezierEaseInOut,
      '--rify-margin': margin,
      '--rify-padding': padding,
      '--rify-max-width': maxWidth,
      '--rify-font-size': fontSize,
      '--rify-icon-margin': iconMargin,
      '--rify-icon-size': iconSize,
      '--rify-close-icon-size': closeIconSize,
      '--rify-close-border-radius': closeBorderRadius,
      '--rify-close-size': closeSize,
      '--rify-close-margin': closeMargin,
      '--rify-text-color': textColor,
      '--rify-color': color,
      '--rify-box-shadow': boxShadow,
      '--rify-icon-color-info': iconColorInfo,
      '--rify-icon-color-success': iconColorSuccess,
      '--rify-icon-color-warning': iconColorWarning,
      '--rify-icon-color-error': iconColorError,
      '--rify-icon-color-loading': iconColorLoading,
      '--rify-close-color-hover': closeColorHover,
      '--rify-close-color-pressed': closeColorPressed,
      '--rify-close-icon-color': closeIconColor,
      '--rify-close-icon-color-pressed': closeIconColorPressed,
      '--rify-close-icon-color-hover': closeIconColorHover,
      '--rify-line-height': lineHeight,
      '--rify-border-radius': borderRadius,
    };
  };

  const { placement = 'top' } = useContext<MessageProviderSetupProps>(MessageContext);

  let iconNode: ReactNode;
  return (
    <div
      className={classNames([`${mergedClsPrefix}-message-wrapper`])}
      onMouseEnter={onMouseenter}
      onMouseLeave={onMouseleave}
      style={{
        alignItems: placement.startsWith('top') ? 'flex-start' : 'flex-end',
        ...(cssVars() as CSSProperties),
      }}
    >
      {renderMessage ? (
        renderMessage(props)
      ) : (
        <div className={classNames([`${mergedClsPrefix}-message ${mergedClsPrefix}-message--${type}-type`, rtlEnabled && `${mergedClsPrefix}-message--rtl`])}>
          {(iconNode = createIconNode(icon, type, mergedClsPrefix)) && showIcon ? (
            <div className={`${mergedClsPrefix}-message__icon ${mergedClsPrefix}-message__icon--${type}-type`}>{iconNode}</div>
          ) : null}
          <div className={`${mergedClsPrefix}-message__content`}>{render(content)}</div>
          {closable ? <RifyBaseClose clsPrefix={mergedClsPrefix} className={`${mergedClsPrefix}-message__close`} onClick={() => props.onClose?.()} absolute /> : null}
        </div>
      )}
    </div>
  );
};
function createIconNode(icon: undefined | ReactNode, type: MessageType, clsPrefix: string): ReactNode {
  if (typeof icon === 'object') {
    return icon;
  } else {
    const innerIcon = type === 'loading' ? <RifyBaseLoading clsPrefix={clsPrefix} strokeWidth={24} scale={0.85} /> : iconRenderMap[type]();
    if (!innerIcon) return null;
    return (
      <RifyBaseIcon clsPrefix={clsPrefix} key={type}>
        {innerIcon}
      </RifyBaseIcon>
    );
  }
}

message.defaultProps = { showIcon: true, type: 'info' };

export default message;
