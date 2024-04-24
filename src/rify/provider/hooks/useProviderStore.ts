import { create } from 'zustand';
import { defaultProps } from '../config';
import { ConfigProviderProps } from '../config-provider';

interface ProviderState {
  context: ConfigProviderProps;
  setContext: (value: ConfigProviderProps) => void;
  getContext: () => ConfigProviderProps;
}

export default create<ProviderState>()((set, get) => ({
  context: defaultProps,

  setContext: value => {
    set({ context: value });
  },

  getContext: () => get().context,
}));
