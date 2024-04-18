import { createElement, ReactNode } from 'react';

export const render = <T extends any[]>(r: string | number | undefined | null | ((...args: [...T]) => ReactNode) | unknown, ...args: [...T]): ReactNode => {
  if (typeof r === 'function') {
    return r(...args);
  } else if (typeof r === 'string') {
    return createElement(r);
  } else if (typeof r === 'number') {
    return createElement(String(r));
  } else {
    return null;
  }
};
