import { CSSProperties, createElement } from 'react';
import { createRoot } from 'react-dom/client';
import { hash } from 'css-render';
import { LoadOptions } from './interface';
import { SpinProps } from '../spin';

class RifyLoad {
  private instance: LoadOptions;
  private renderId: string;
  private node: HTMLElement;
  private isShow: boolean = true;
  private spin: JSX.Element = createElement('div');

  /**
   * 构造函数
   * @param options 组件参数
   */
  constructor(options: LoadOptions, rNode: HTMLElement, spin: (props: SpinProps) => JSX.Element) {
    this.instance = options;
    this.renderId = `rify-loading-${hash(Date.now().toString())}`;
    this.node = rNode;
    this.init();
    this.setSpin(spin);
  }

  private init() {
    this.node.setAttribute('id', this.renderId);
    this.node.setAttribute('class', 'rify-loading');
    this.node.style.position = 'fixed';
    this.node.style.inset = '0';
    this.node.style.zIndex = this.instance.zIndex.toString();
    document.body.appendChild(this.node);
  }

  private setSpin(spin: (props: SpinProps) => JSX.Element) {
    const { bgColor = 'rgba(0, 0, 0, 0.45)', isShow: show = true, color: stroke, strokeWidth, message: description, size } = this.instance;
    const props = {
      bgColor,
      contentStyle: { width: '100vw', height: '100vh' } as CSSProperties,
      fullscreen: true,
      stroke,
      strokeWidth,
      description,
      size,
    };
    this.isShow = show;
    this.spin = spin({ show: this.isShow, ...props });
    createRoot(this.node).render(this.spin);
  }

  /**
   * 组件显示方法
   */
  public show() {
    // 设置组件显示
    this.instance.isShow = true;
  }

  /**
   * 组件隐藏方法
   */
  public close() {
    // 设置组件隐藏
    this.instance.isShow = false;
  }

  /**
   * 组件销毁方法
   */
  public remove() {
    document.querySelector(`#${this.renderId}`)?.remove();
  }
}
export { RifyLoad };
