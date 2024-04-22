import { RefAttributes } from 'react';
import { MessageProps } from './message-props';
import { RifyFadeInExpandTransition } from '../../_internal';
import { PrivateMessageRef } from './message-context';
import { MessageRenderMessage } from './interface';
import Message from './message';

type MessageEnvironmentProps = MessageProps & {
  duration?: number;
  onAfterLeave?: Function;
  onLeave?: Function;
  internalKey: string;
  // private
  onInternalAfterLeave?: (key: string) => void;
  onMounted?: () => void;
  render?: MessageRenderMessage;
};

const messageEnvironment: React.ForwardRefExoticComponent<MessageEnvironmentProps & RefAttributes<PrivateMessageRef>> = forwardRef((props, ref) => {
  const { closable, content, keepAliveOnHover, onLeave, type = 'info', icon, showIcon = true, onMounted } = props;
  const [show, setShow] = useState<boolean>(true);

  let timerId: number | null = null;

  useEffect(() => {
    setHideTimeout();
    onMounted?.();
    return () => {
      if (timerId) clearTimeout(timerId);
    };
  }, []);

  useImperativeHandle(ref, () => ({
    key: props.internalKey,
    hide,
  }));

  function setHideTimeout(): void {
    const { duration } = props;
    if (duration) {
      timerId = setTimeout(hide, duration);
    }
  }
  function handleMouseenter(): void {
    if (timerId !== null) {
      clearTimeout(timerId);
      timerId = null;
    }
  }
  function handleMouseleave(): void {
    setHideTimeout();
  }

  function hide(): void {
    setShow(false);
    if (timerId) {
      clearTimeout(timerId);
      timerId = null;
    }
  }
  function handleClose(): void {
    const { onClose } = props;
    if (onClose) onClose();
    hide();
  }

  function handleAfterLeave(): void {
    const { onAfterLeave, onInternalAfterLeave, internalKey } = props;
    if (onAfterLeave) onAfterLeave();
    if (onInternalAfterLeave) onInternalAfterLeave(internalKey);
  }

  return (
    <>
      <RifyFadeInExpandTransition in={show} onAfterLeave={handleAfterLeave} onLeave={() => onLeave?.()}>
        <Message
          content={content}
          type={type}
          icon={icon}
          showIcon={showIcon}
          closable={closable}
          onClose={handleClose}
          onMouseenter={keepAliveOnHover ? handleMouseenter : undefined}
          onMouseleave={keepAliveOnHover ? handleMouseleave : undefined}
          render={props.render}
        />
      </RifyFadeInExpandTransition>
    </>
  );
});

messageEnvironment.defaultProps = { duration: 3000, type: 'info', showIcon: true };

export default messageEnvironment;
