import { Resolver } from 'unplugin-auto-import/types';

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
