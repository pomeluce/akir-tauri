import { Root, createRoot } from 'react-dom/client';
import loading, { LoadingProps } from './loading';

export class Loading {
  app: HTMLElement;
  isExist: boolean;
  config: LoadingProps;
  timer: number | null = null;
  root: Root | null = null;

  constructor(config = {}) {
    this.app = document.createElement('div');
    this.isExist = false;
    this.config = config;
  }

  private render() {
    document.body.appendChild(this.app);
    this.app.setAttribute('id', 'rify-loading');
    this.root = createRoot(this.app);
    this.root.render(loading(this.config));
  }

  show() {
    let clicked = false;
    if (!clicked) {
      clicked = true;
      this.render();
    }
  }

  close() {
    // 卸载组件
    this.root?.unmount();
    // 移除容器
    if (document.body.contains(this.app)) document.body.removeChild(this.app);
  }
}
