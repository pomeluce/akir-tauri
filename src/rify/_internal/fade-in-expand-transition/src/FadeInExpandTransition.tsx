import { ReactNode } from 'react';
import { CSSTransition } from 'react-transition-group';
import { cloneElement } from '../../../_utils';

interface Props {
  in?: boolean;
  appear?: boolean;
  mode?: 'in-out' | 'out-in' | 'default';
  onLeave?: Function;
  onAfterLeave?: Function;
  onAfterEnter?: Function;
  width?: boolean;
  reverse?: boolean;
  children?: ReactNode;
}

const FadeInExpandTransition: React.FC<Props> = props => {
  const { appear, mode, in: inProps, width, children, reverse } = props;
  const ref = createRef<HTMLElement | undefined>();

  const [show, setShow] = useState<boolean>(inProps || false);

  useEffect(() => {
    setShow(props.in ?? false);
  }, [props]);

  const handleBeforeLeave = () => {
    if (ref.current) {
      if (width) {
        ref.current.style.maxWidth = `${ref.current.offsetWidth}px`;
      } else {
        ref.current.style.maxHeight = `${ref.current.offsetHeight}px`;
      }
      void ref.current.offsetWidth;
    }
  };

  const handleLeave = () => {
    if (ref.current) {
      if (width) {
        ref.current.style.maxWidth = '0';
      } else {
        ref.current.style.maxHeight = '0';
      }
      void ref.current.offsetWidth;
    }
    props.onLeave?.();
  };

  const handleAfterLeave = () => {
    if (ref.current) {
      if (width) {
        ref.current.style.maxWidth = '';
      } else {
        ref.current.style.maxHeight = '';
      }
    }
    props.onAfterLeave?.();
  };

  const handleEnter = () => {
    if (ref.current) {
      ref.current.style.transition = 'none';
      if (width) {
        const memorizedWidth = ref.current.offsetWidth;
        ref.current.style.maxWidth = '0';
        void ref.current.offsetWidth;
        ref.current.style.transition = '';
        ref.current.style.maxWidth = `${memorizedWidth}px`;
      } else {
        if (reverse) {
          ref.current.style.maxHeight = `${ref.current.offsetHeight}px`;
          void ref.current.offsetHeight;
          ref.current.style.transition = '';
          ref.current.style.maxHeight = '0';
        } else {
          const memorizedHeight = ref.current.offsetHeight;
          ref.current.style.maxHeight = '0';
          void ref.current.offsetWidth;
          ref.current.style.transition = '';
          ref.current.style.maxHeight = `${memorizedHeight}px`;
        }
      }
      void ref.current.offsetWidth;
    }
  };

  const handleAfterEnter = () => {
    if (ref.current) {
      if (width) {
        ref.current.style.maxWidth = '';
      } else {
        if (!reverse) {
          ref.current.style.maxHeight = '';
        }
      }
    }
    props.onAfterEnter?.();
  };

  if (!children) return null;

  return (
    <CSSTransition
      nodeRef={ref}
      in={show}
      mode={mode}
      timeout={{ enter: 0, exit: 0 }}
      classNames={width ? 'fade-in-width-expand-transition' : 'fade-in-height-expand-transition'}
      appear={appear}
      onEnter={handleEnter}
      onEntered={handleAfterEnter}
      onExit={handleLeave}
      onExiting={handleBeforeLeave}
      onExited={handleAfterLeave}
    >
      {cloneElement(children, { ref: ref })}
    </CSSTransition>
  );
};

export default FadeInExpandTransition;
