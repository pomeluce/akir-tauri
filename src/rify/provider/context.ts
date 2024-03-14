import { createContext } from 'react';
import config from './config';
import { ConfigProviderProps } from './interface';

export const ProviderContext = createContext<ConfigProviderProps>(config);
