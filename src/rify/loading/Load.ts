import { hash } from 'css-render';
import { LoadOptions } from './interface';

class RifyLoad {
  private instance: LoadOptions;
  private renderId: string;

  /**
   * 构造函数
   * @param options 组件参数
   */
  constructor(options: LoadOptions, rNode: HTMLElement) {
    this.instance = options;
    this.renderId = `rify-loading-${hash(Date.now().toString())}`;
    rNode.setAttribute('id', this.renderId);
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
