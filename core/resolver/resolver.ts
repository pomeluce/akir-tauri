import { Resolver } from 'unplugin-auto-import/types';
import { ResolverOptions } from './types';
import { arcoComponents } from './preset';
import { arcoComponentMap } from './utils';

/* arco 组件自动导入 */
export const ArcoResolver = (options: ResolverOptions = {}): Resolver => {
  const { prefix } = options;
  const componentMap = arcoComponentMap(prefix);
  return {
    type: 'component',
    resolve: (originName: string) => {
      if (!!prefix) {
        const name = componentMap.get(originName);
        if (!!name) return { from: '@arco-design/web-react', name, as: originName };
      } else {
        if (arcoComponents.includes(originName)) return { from: '@arco-design/web-react', name: originName };
      }
    },
  };
};

/* icon 图标库自动按需导入 */
export const IconpackResolver = (): Resolver => {
  return {
    type: 'component',
    resolve: (name: string) => {
      if (name.startsWith('Icon')) {
        return { from: '@icon-park/react', name: name.slice(4), as: name };
      }
    },
  };
};
