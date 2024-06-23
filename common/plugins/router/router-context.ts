import { createContext, ReactNode } from 'react';
import createRouter from '.';

interface RouterContextProps {
  children?: ReactNode;
  router: ReturnType<typeof createRouter>;
}

export const RouterContext = createContext<RouterContextProps>({} as RouterContextProps);
