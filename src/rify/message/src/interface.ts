import { CSSProperties, ReactNode } from 'react';
import type { MessageSetupProps } from './message-props';

export type MessageType = 'info' | 'success' | 'warning' | 'error' | 'loading' | 'default';

// We should export keepAliveOnHover since it's not managed by users
export type RenderMessageProps = Pick<MessageSetupProps, 'closable' | 'content' | 'icon' | 'onClose' | 'type'>;

export type MessageRenderMessage = (props: RenderMessageProps) => ReactNode;

export interface MessageOptions {
  type?: MessageType;
  render?: MessageRenderMessage;
  duration?: number;
  closable?: boolean;
  keepAliveOnHover?: boolean;
  icon?: ReactNode;
  showIcon?: boolean;
  onClose?: () => void;
  onLeave?: () => void;
  onAfterLeave?: () => void;
}

export interface MessageConfig {
  clsPrefix?: string;
  to?: Element;
  duration?: number;
  keepAliveOnHover?: boolean;
  max?: number;
  placement?: 'top' | 'top-left' | 'top-right' | 'bottom' | 'bottom-left' | 'bottom-right';
  closable?: boolean;
  containerClass?: string;
  containerStyle?: CSSProperties;
  children?: ReactNode;
}
