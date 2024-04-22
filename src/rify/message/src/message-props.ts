import { MouseEvent, ReactNode } from 'react';
import type { MessageConfig, MessageType } from './types';

export interface MessageProps {
  icon?: ReactNode;
  type?: MessageType;
  content?: string | number | ReactNode;
  showIcon?: boolean;
  closable?: boolean;
  keepAliveOnHover?: boolean;
  onClose?: VoidFunction;
  onMouseenter?: (e: MouseEvent) => void;
  onMouseleave?: (e: MouseEvent) => void;
  placement?: 'top' | 'top-left' | 'top-right' | 'bottom' | 'bottom-left' | 'bottom-right';
}
export type MessageSetupProps = MessageProps;
