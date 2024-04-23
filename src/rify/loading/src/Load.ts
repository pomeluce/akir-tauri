import { CSSProperties } from 'react';
import { LoadOptions } from './interface';
import { SpinProps } from '../../spin';
import { render, unmount } from 'rc-util/lib/React/render';
import { createId } from 'seemly';

class RifyLoad {
  private instance: LoadOptions;
  private renderId: string;
  private node: HTMLElement;

  /**
   * 构造函数
   * @param options 组件参数
   */
  constructor(options: LoadOptions, rNode: HTMLElement, spin: (props: SpinProps) => JSX.Element) {
    this.instance = options;
    this.renderId = `rify-loading-${createId()}`;
    this.node = rNode;
    this.init();
    this.setSpin(spin);
  }

  private init() {
    this.node.setAttribute('id', this.renderId);
    this.node.setAttribute('class', 'rify-loading');
    this.node.style.display = this.instance.isShow ? '' : 'none';
    this.node.style.position = 'fixed';
    this.node.style.inset = '0';
    this.node.style.zIndex = this.instance.zIndex?.toString() || '1000';
    this.node.style.transition = 'all .3s';
    document.body.appendChild(this.node);
  }

  private setSpin(spin: (props: SpinProps) => JSX.Element) {
    const { bgColor = 'rgba(0, 0, 0, 0.45)', color: stroke, strokeWidth, message: description, size } = this.instance;
    const props = {
      bgColor,
      show: true,
      contentStyle: { width: '100vw', height: '100vh' } as CSSProperties,
      fullscreen: true,
      stroke,
      strokeWidth,
      description,
      size,
    };
    render(spin({ ...props }), this.node);
  }

  /**
   * 组件显示方法
   */
  public show() {
    // 设置组件显示
    this.node.style.display = '';
  }

  /**
   * 组件隐藏方法
   */
  public close() {
    // 设置组件隐藏
    this.node.style.display = 'none';
  }

  /**
   * 组件销毁方法
   */
  public remove() {
    unmount(this.node);
    this.node.remove();
  }
}
export { RifyLoad };
