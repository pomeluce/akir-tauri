import { createRoot } from 'react-dom/client';
import { Spin } from '../spin';
import { RifyLoad } from './Load';
import { LoadOptions } from './interface';

export default (
  config: LoadOptions = {
    isShow: true,
    zIndex: 1000,
  },
) => {
  // 创建根目录元素
  const rNode: HTMLElement = document.createElement('div');
  // 设置 class 属性
  rNode.setAttribute('class', 'rify-loading');
  // 创建 RifyLoad 对象
  const load = new RifyLoad(config, rNode);
  // 挂在 rNode 到 body 下面
  document.body.appendChild(rNode);
  // 创建 spin 数据
  const { bgColor, isShow: show, color: stroke, strokeWidth, message: description, size, zIndex } = config;
  const props = {
    bgColor,
    show,
    stroke,
    strokeWidth,
    description,
    size,
    zIndex,
    children: '',
  };
  // 挂在组件
  createRoot(rNode).render(<Spin {...props} />);
  return load;
};
