import { createContext } from 'react';
import config from './config';
import { ConfigProviderProps } from './config-provider';

export const ProviderContext = createContext<ConfigProviderProps>(config);
