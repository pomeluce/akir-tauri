import { ReactNode } from 'react';
import { Transition, TransitionGroup } from 'react-transition-group';

interface Props {
  appear?: boolean;
  group?: boolean;
  mode?: 'in-out' | 'out-in' | 'default';
  onLeave?: Function;
  onAfterLeave?: Function;
  onAfterEnter?: Function;
  width?: boolean;
  // reverse mode is only used in tree
  // it make it from expanded to collapsed after mounted
  reverse?: boolean;
  children?: ReactNode;
}

const FadeInExpandTransition: React.FC<Props> = props => {
  const { appear, group, mode, width, reverse, children } = props;

  const handleBeforeLeave = (node: HTMLElement) => {
    if (width) {
      node.style.maxWidth = `${node.offsetWidth}px`;
    } else {
      node.style.maxHeight = `${node.offsetHeight}px`;
    }
    void node.offsetWidth;
  };

  const handleLeave = (node: HTMLElement) => {
    if (width) {
      node.style.maxWidth = '0';
    } else {
      node.style.maxHeight = '0';
    }
    void node.offsetWidth;
    props.onLeave?.();
  };

  const handleAfterLeave = (node: HTMLElement) => {
    if (width) {
      node.style.maxWidth = '';
    } else {
      node.style.maxHeight = '';
    }
    props.onAfterLeave?.();
  };

  const handleEnter = (node: HTMLElement) => {
    node.style.transition = 'none';
    if (width) {
      const memorizedWidth = node.offsetWidth;
      node.style.maxWidth = '0';
      void node.offsetWidth;
      node.style.transition = '';
      node.style.maxWidth = `${memorizedWidth}px`;
    } else {
      if (reverse) {
        node.style.maxHeight = `${node.offsetHeight}px`;
        void node.offsetHeight;
        node.style.transition = '';
        node.style.maxHeight = '0';
      } else {
        const memorizedHeight = node.offsetHeight;
        node.style.maxHeight = '0';
        void node.offsetWidth;
        node.style.transition = '';
        node.style.maxHeight = `${memorizedHeight}px`;
      }
    }
    void node.offsetWidth;
  };

  const handleAfterEnter = (node: HTMLElement) => {
    if (width) {
      node.style.maxWidth = '';
    } else {
      if (!reverse) {
        node.style.maxHeight = '';
      }
    }
    props.onAfterEnter?.();
  };

  if (!children) return null;

  return (
    <>
      {!group ? (
        <TransitionGroup>
          <Transition
            className={width ? 'fade-in-width-expand-transition' : 'fade-in-height-expand-transition'}
            appear={appear}
            onEnter={handleEnter}
            onEntered={handleAfterEnter}
            onExit={handleLeave}
            onExiting={handleBeforeLeave}
            onExited={handleAfterLeave}
            timeout={{ enter: 0, exit: 0 }}
          >
            {children}
          </Transition>
        </TransitionGroup>
      ) : (
        <Transition
          className={width ? 'fade-in-width-expand-transition' : 'fade-in-height-expand-transition'}
          appear={appear}
          onEnter={handleEnter}
          onEntered={handleAfterEnter}
          onExit={handleLeave}
          onExiting={handleBeforeLeave}
          onExited={handleAfterLeave}
          timeout={{ enter: 0, exit: 0 }}
          mode={mode}
        >
          {children}
        </Transition>
      )}
    </>
  );
};

export default FadeInExpandTransition;
