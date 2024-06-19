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

const prefixs = [
  'Ai',
  'Bi',
  'Bs',
  'Cg',
  'Ci',
  'Di',
  'Fa',
  'Fc',
  'Fi',
  'Gi',
  'Go',
  'Gr',
  'Hi',
  'Im',
  'Io',
  'Lia',
  'Lu',
  'Md',
  'Pi',
  'Ri',
  'Rx',
  'Si',
  'Sl',
  'Tb',
  'Tfi',
  'Ti',
  'Vsc',
  'Wi',
];

/* icon 图标库自动按需导入 */
export const IconResolver = (): Resolver => {
  return {
    type: 'component',
    resolve: (name: string) => {
      let words = [''];
      if (name.startsWith('Icon') && (words = name.slice(4).match(/[A-Z][a-z\d]*/g)) && prefixs.includes(words[0])) {
        return { from: `react-icons/${words[0].toLowerCase()}`, name: words[0] + name.slice(4 + words[0].length), as: name };
      }
    },
  };
};
