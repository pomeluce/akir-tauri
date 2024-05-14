import { create } from 'zustand';

export interface ThemeState {
  theme: 'light' | 'dark';
  setTheme: (value: 'light' | 'dark') => void;
  toggleTheme: () => void;
}

export default create<ThemeState>()((set, get) => ({
  theme: 'light',

  setTheme: value => {
    document.documentElement.dataset.theme = value;
    document.body.setAttribute('arco-theme', value);
    set({ theme: value });
  },

  toggleTheme: () => {
    const current = get().theme;
    set({ theme: current === 'light' ? 'dark' : 'light' });
    document.documentElement.dataset.theme = get().theme;
    document.body.setAttribute('arco-theme', get().theme);
  },
}));
