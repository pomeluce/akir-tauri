import { Root, createRoot } from 'react-dom/client';
import SuspenseFallback from '@/layouts/SuspenseFallback';

class Loading {
  app: HTMLElement;
  isExist: boolean;
  timer: number | null = null;
  root: Root | null = null;

  constructor() {
    this.app = document.createElement('div');
    this.isExist = false;
  }

  private render() {
    document.body.appendChild(this.app);
    this.app.setAttribute('id', 'rify-loading');
    this.root = createRoot(this.app);
    this.root.render(SuspenseFallback({}));
  }

  show(isDelay = true, delay = 300) {
    this.timer && clearTimeout(this.timer);
    if (!isDelay) this.render();
    // 防闪烁
    else this.timer = setTimeout(() => this.render(), delay);
  }

  close() {
    // 卸载组件
    this.root?.unmount();
    // 移除容器
    if (document.body.contains(this.app)) document.body.removeChild(this.app);
  }
}

export default new Loading();
