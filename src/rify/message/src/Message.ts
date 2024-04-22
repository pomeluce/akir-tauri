import { ReactNode } from 'react';
import { MessageConfig, MessageOptions, MessageType } from './interface';
import { InternalMessageProps, MessageReactive, PrivateMessageRef } from './message-context';
import { createId } from 'seemly';
import { render } from 'rc-util/lib/React/render';
import classNames from 'classnames';

type ContentType = string | ReactNode;

export class Message {
  private global: MessageConfig;
  private message: (props: InternalMessageProps) => JSX.Element;
  private count: number = 0;
  private messageRefs: Record<string, PrivateMessageRef> = {};
  private isMount: boolean = false;

  constructor(config: MessageConfig, message: (props: InternalMessageProps) => JSX.Element) {
    this.global = config;
    this.message = message;
    if (!config.to) {
      this.global.to = this.rootNode();
    }
  }

  private rootNode() {
    const { containerClass, containerStyle, clsPrefix, placement } = this.global;
    const root = document.createElement('div');
    root.className = classNames([`${clsPrefix}-message-container`, `${clsPrefix}-message-container--${placement}`, containerClass]);
    Object.assign(root.style, containerStyle);
    return root;
  }

  private create = (content: ContentType, options: MessageOptions & { type: MessageType }): MessageReactive => {
    const root = this.global.to as HTMLElement;
    if (!this.isMount) {
      document.body.appendChild(root);
      this.isMount = true;
    }
    const key = createId();
    const messageState = {
      ...options,
      content,
      key,
      destroy: () => {
        this.messageRefs[key]?.hide();
      },
    };
    // const { max } = this.global;
    render(this.message({ config: this.global, message: messageState, refs: this.messageRefs, handleAfterLeave: this.handleAfterLeave }), root);
    this.count++;
    return messageState;
  };

  public defualt = (content: ContentType, options?: MessageOptions) => {
    return this.create(content, { type: 'default', ...options });
  };
  public info = (content: ContentType, options?: MessageOptions) => {
    return this.create(content, { ...options, type: 'info' });
  };
  public success = (content: ContentType, options?: MessageOptions) => {
    return this.create(content, { ...options, type: 'success' });
  };
  public warning = (content: ContentType, options?: MessageOptions) => {
    return this.create(content, { ...options, type: 'warning' });
  };
  public error = (content: ContentType, options?: MessageOptions) => {
    return this.create(content, { ...options, type: 'error' });
  };
  public loading = (content: ContentType, options?: MessageOptions) => {
    return this.create(content, { ...options, type: 'loading' });
  };

  public destroyAll = (): void => {
    Object.values(this.messageRefs).forEach(messageInstRef => {
      messageInstRef.hide();
    });
  };

  private handleAfterLeave = (key: string): void => {
    delete this.messageRefs[key];
    if (--this.count === 0) {
      document.body.removeChild(this.global.to as HTMLElement);
      this.isMount = false;
    }
  };
}
