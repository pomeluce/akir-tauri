import { ReactNode } from 'react';
import { MessageConfig, MessageOptions, MessageType } from './interface';
import { InternalMessageProps, MessageReactive, PrivateMessageRef } from './message-context';
import { createId } from 'seemly';
import { render, unmount } from 'rc-util/lib/React/render';
import classNames from 'classnames';

type ContentType = string | ReactNode;

export class Message {
  private global: MessageConfig;
  private message: (props: InternalMessageProps) => JSX.Element;
  private messageRefs: Record<string, PrivateMessageRef> = {};
  private rootList: Array<{ key: string; node: HTMLElement }> = [];
  private renderMessage: HTMLElement;
  private isMount: boolean = false;

  constructor(config: MessageConfig, message: (props: InternalMessageProps) => JSX.Element) {
    this.global = config;
    this.message = message;
    this.renderMessage = this.rootNode();
  }

  private rootNode() {
    const { containerClass, containerStyle, clsPrefix, placement } = this.global;
    const root = document.createElement('div');
    root.className = classNames([`${clsPrefix}-message-container`, `${clsPrefix}-message-container--${placement}`, containerClass]);
    Object.assign(root.style, containerStyle);
    return root;
  }
  private contextElement() {
    const { clsPrefix } = this.global;
    const contextEl = document.createElement('div');
    contextEl.className = `${clsPrefix}-message-context`;
    return contextEl;
  }

  private create = (content: ContentType, options: MessageOptions & { type: MessageType }): MessageReactive => {
    const { to } = this.global;
    const renderRoot = this.contextElement();
    this.renderMessage.appendChild(renderRoot);

    if (!this.isMount) {
      to ? to.appendChild(this.renderMessage) : document.body.appendChild(this.renderMessage);
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
    this.rootList.push({
      key,
      node: renderRoot,
    });
    const { max } = this.global;
    if (max && this.rootList.length > max) {
      const firstNode = this.rootList.shift();
      unmount(firstNode!.node);
    }
    render(this.message({ config: { ...this.global, to: renderRoot }, message: messageState, refs: this.messageRefs, handleAfterLeave: this.handleAfterLeave }), renderRoot);
    return messageState;
  };

  private handleAfterLeave = (key: string): void => {
    const index = this.rootList.findIndex(root => root.key === key);
    this.renderMessage.removeChild(this.rootList[index].node);
    unmount(this.rootList[index].node);
    this.rootList.splice(index, 1);
    delete this.messageRefs[key];

    if (this.rootList.length === 0) {
      const { to } = this.global;
      to ? to.removeChild(this.renderMessage) : document.body.removeChild(this.renderMessage);
      this.isMount = false;
    }
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
}
