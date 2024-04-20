import React, { CSSProperties, ReactNode, createContext } from 'react';
import MessageEnvironment from './message-environment';
import { MessageOptions, MessageType } from './types';
import { createPortal } from 'react-dom';
import { useConfig } from '../../_mixins';
import { createId } from 'seemly';
import { omit } from '../../_utils';
import classNames from 'classnames';

type ContentType = string | ReactNode;

export interface MessageApiInjection {
  create: (content: ContentType, options?: MessageOptions) => MessageReactive;
  info: (content: ContentType, options?: MessageOptions) => MessageReactive;
  success: (content: ContentType, options?: MessageOptions) => MessageReactive;
  warning: (content: ContentType, options?: MessageOptions) => MessageReactive;
  error: (content: ContentType, options?: MessageOptions) => MessageReactive;
  loading: (content: ContentType, options?: MessageOptions) => MessageReactive;
  destroyAll: () => void;
}

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

interface PrivateMessageReactive extends MessageReactive {
  key: string;
}

export interface PrivateMessageRef extends MessageReactive {
  key: string;
  hide: () => void;
}

export type MessageProviderInst = MessageApiInjection;

export interface MessageProviderProps {
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

export type MessageProviderSetupProps = MessageProviderProps & {
  api: MessageApiInjection;
};

export const MessageContext = createContext<MessageProviderSetupProps>({
  to: document.body,
  placement: 'top',
  duration: 3000,
  api: {} as MessageApiInjection,
});

const MessageProvider: React.FC<MessageProviderProps> = props => {
  const { mergedClsPrefix } = useConfig();
  const [messageList, setMessageList] = useState<PrivateMessageReactive[]>([]);
  const [messageRefs, setMessageRefs] = useState<Record<string, PrivateMessageRef>>({});

  const { children, containerClass, containerStyle, placement = 'top', to } = props;

  const messageAPI: MessageApiInjection = {
    create(content: ContentType, options?: MessageOptions) {
      return create(content, { type: 'default', ...options });
    },
    info(content: ContentType, options?: MessageOptions) {
      return create(content, { ...options, type: 'info' });
    },
    success(content: ContentType, options?: MessageOptions) {
      return create(content, { ...options, type: 'success' });
    },
    warning(content: ContentType, options?: MessageOptions) {
      return create(content, { ...options, type: 'warning' });
    },
    error(content: ContentType, options?: MessageOptions) {
      return create(content, { ...options, type: 'error' });
    },
    loading(content: ContentType, options?: MessageOptions) {
      return create(content, { ...options, type: 'loading' });
    },
    destroyAll,
  };

  function create(content: ContentType, options: MessageOptions & { type: MessageType }): MessageReactive {
    const key = createId();
    const messageState = {
      ...options,
      content,
      key,
      destroy: () => {
        messageRefs[key]?.hide();
      },
    };
    setMessageList(prevList => {
      const newList = [...prevList, messageState];
      const { max } = props;
      if (max && newList.length > max) {
        newList.shift();
      }
      return newList;
    });
    return messageState;
  }

  function handleAfterLeave(key: string): void {
    setMessageList(prevList => {
      const newList = prevList.filter(message => message.key !== key);
      delete messageRefs[key];
      setMessageRefs({ ...messageRefs });
      return newList;
    });
  }

  function destroyAll(): void {
    Object.values(messageRefs).forEach(messageInstRef => {
      messageInstRef.hide();
    });
  }

  const contextValue = useMemo<MessageProviderProps>(
    () => ({
      placement,
      api: messageAPI,
    }),
    [props],
  );

  function messageEnv(message: PrivateMessageReactive, refs: Record<string, PrivateMessageRef>, handleAfterLeave: (key: string) => void, props: MessageProviderProps) {
    const { closable, duration = 3000, keepAliveOnHover } = props;
    const ref = createRef<PrivateMessageRef>();

    const onMounted = () => {
      if (ref.current) refs[message.key] = ref.current;
    };

    return (
      <MessageEnvironment
        ref={ref}
        internalKey={message.key}
        onInternalAfterLeave={handleAfterLeave}
        onMounted={onMounted}
        duration={message.duration === undefined ? duration : message.duration}
        keepAliveOnHover={message.keepAliveOnHover === undefined ? keepAliveOnHover : message.keepAliveOnHover}
        closable={message.closable === undefined ? closable : message.closable}
        {...omit(message, ['destroy'], undefined)}
      />
    );
  }

  return (
    <MessageContext.Provider value={{ ...contextValue } as MessageProviderSetupProps}>
      {children}
      {messageList.length
        ? createPortal(
            <div
              className={classNames([`${mergedClsPrefix}-message-container`, `${mergedClsPrefix}-message-container--${placement}`, containerClass])}
              key="message-container"
              style={containerStyle}
            >
              {messageList.map(message => messageEnv(message, messageRefs, handleAfterLeave, props))}
            </div>,
            to ?? document.body,
          )
        : null}
    </MessageContext.Provider>
  );
};
export default MessageProvider;
