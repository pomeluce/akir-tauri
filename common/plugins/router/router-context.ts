import { createContext, ReactNode } from 'react';
import { RouterHandler } from './router-handler';

interface RouterContextProps {
  children?: ReactNode;
  router: RouterHandler;
}

export const RouterContext = createContext<RouterContextProps>({} as RouterContextProps);
