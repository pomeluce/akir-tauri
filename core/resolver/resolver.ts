import { Resolver } from 'unplugin-auto-import/types';
import { ResolverOptions } from './types';
import { antdComponents, rifyComponents } from './preset';
import { antdComponentMap } from './utils';

// antd 组件自动按需导入
export const AntdResolver = (options: ResolverOptions = {}): Resolver => {
  const { prefix } = options;
  const componentMap = antdComponentMap(prefix);
  return {
    type: 'component',
    resolve: (originName: string) => {
      // 如果有前缀则重命名引入
      if (!!prefix) {
        const name = componentMap.get(originName);
        if (!!name) return { from: 'antd', name, as: originName };
      } else {
        if (antdComponents.includes(originName)) return { from: 'antd', name: originName };
      }
    },
  };
};

// 自定义 rify 组件自动按需导入
export const RifyResolver = (): Resolver => {
  return {
    type: 'component',
    resolve: (name: string) => {
      if (name.startsWith('Rify') && rifyComponents.includes(name.slice(4))) {
        return { from: '@/rify', name: name.slice(4), as: name };
      }
    },
  };
};

// icon-park 图标库自动按需导入
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
