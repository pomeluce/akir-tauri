import { createContext } from 'react';
import { defaultProps } from './config';
import { ConfigProviderProps } from './config-provider';

export const ProviderContext = createContext<ConfigProviderProps>(defaultProps);
