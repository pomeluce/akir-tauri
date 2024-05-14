import { arcoComponents } from './preset';

export const arcoComponentMap = (prefix?: string): Map<string, string> => {
  return arcoComponents.reduce((map: Map<string, string>, name: string) => map.set(`${prefix ?? ''}${name}`, name), new Map());
};
