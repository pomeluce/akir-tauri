import { arcoComponents } from './preset';

export const arcoComponentMap = (prefix?: string): Map<string, string> => {
  return arcoComponents.reduce((map: Map<string, string>, name: string) => map.set(`${prefix ?? ''}${convertName(name)}`, name), new Map());
};

const convertName = (name: string) => {
  switch (name) {
    case 'theme':
      return 'Theme';
    case 'message':
      return 'Message';
    case 'notification':
      return 'Notification';
    default:
      return name;
  }
};
