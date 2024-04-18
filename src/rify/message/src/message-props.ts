import { MouseEvent, ReactNode } from 'react';
import type { MessageType } from './types';

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
}
export type MessageSetupProps = MessageProps;
