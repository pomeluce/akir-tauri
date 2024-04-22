import { ReactNode } from 'react';
import MessageEnvironment from './message-environment';
import { MessageConfig, MessageType } from './interface';
import { createPortal } from 'react-dom';
import { omit } from '../../_utils';

type ContentType = string | ReactNode;

export interface MessageReactive {
  content?: ContentType;
  duration?: number;
  closable?: boolean;
  keepAliveOnHover?: boolean;
  type?: MessageType;
  icon?: ReactNode;
  showIcon?: boolean;
  onClose?: () => void;
  destroy?: () => void;
}

export interface PrivateMessageReactive extends MessageReactive {
  key: string;
}

export interface PrivateMessageRef extends MessageReactive {
  key: string;
  hide: () => void;
}

export interface InternalMessageProps {
  config: MessageConfig;
  handleAfterLeave: (key: string) => void;
  message: PrivateMessageReactive;
  refs: Record<string, PrivateMessageRef>;
}

const internalMessage: React.FC<InternalMessageProps> = props => {
  const { config, handleAfterLeave, message, refs } = props;
  const { closable, duration = 3000, keepAliveOnHover, placement = 'top', to } = config;
  const ref = createRef<PrivateMessageRef>();

  const onMounted = () => {
    if (ref.current) refs[message.key] = ref.current;
  };

  return (
    <>
      {createPortal(
        <MessageEnvironment
          ref={ref}
          internalKey={message.key}
          onInternalAfterLeave={handleAfterLeave}
          onMounted={onMounted}
          duration={message.duration === undefined ? duration : message.duration}
          keepAliveOnHover={message.keepAliveOnHover === undefined ? keepAliveOnHover : message.keepAliveOnHover}
          closable={message.closable === undefined ? closable : message.closable}
          placement={placement}
          {...omit(message, ['destroy'], undefined)}
        />,
        to ?? document.body,
      )}
    </>
  );
};

if (__DEV__) internalMessage.displayName = 'rify-message';

export default internalMessage;
