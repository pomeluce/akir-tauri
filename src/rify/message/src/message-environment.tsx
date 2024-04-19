import { MouseEvent, RefAttributes } from 'react';
import { MessageProps } from './message-props';
import { RifyFadeInExpandTransition } from '../../_internal';
import { PrivateMessageRef } from './message-context';
import RifyMessage from './message';

type MessageEnvironmentProps = MessageProps & {
  duration?: number;
  onAfterLeave?: Function;
  onLeave?: Function;
  internalKey: string;
  // private
  onInternalAfterLeave?: (key: string) => void;
};

const messageEnvironment: React.ForwardRefExoticComponent<MessageEnvironmentProps & RefAttributes<PrivateMessageRef>> = forwardRef((props, ref) => {
  const { closable, content, keepAliveOnHover, onLeave, type = 'info', icon, showIcon = true } = props;
  const [show, setShow] = useState<boolean>(true);

  let timerId: number | null = null;

  useEffect(() => {
    setHideTimeout();
  });

  useImperativeHandle(ref, () => ({
    key: props.internalKey,
    hide,
  }));

  function setHideTimeout(): void {
    const { duration } = props;
    if (duration) {
      timerId = window.setTimeout(hide, duration);
    }
  }
  function handleMouseenter(e: MouseEvent): void {
    if (e.currentTarget !== e.target) return;
    if (timerId !== null) {
      window.clearTimeout(timerId);
      timerId = null;
    }
  }
  function handleMouseleave(e: MouseEvent): void {
    if (e.currentTarget !== e.target) return;
    setHideTimeout();
  }

  function hide(): void {
    setShow(false);
    if (timerId) {
      window.clearTimeout(timerId);
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
      <RifyFadeInExpandTransition appear onAfterLeave={handleAfterLeave} onLeave={() => onLeave?.()}>
        {show ? (
          <RifyMessage
            content={content}
            type={type}
            icon={icon}
            showIcon={showIcon}
            closable={closable}
            onClose={handleClose}
            onMouseenter={keepAliveOnHover ? handleMouseenter : undefined}
            onMouseleave={keepAliveOnHover ? handleMouseleave : undefined}
          />
        ) : null}
      </RifyFadeInExpandTransition>
    </>
  );
});

messageEnvironment.defaultProps = { duration: 3000, type: 'info', showIcon: true };

export default messageEnvironment;
