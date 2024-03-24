import { create } from 'zustand';
import { GlobalTheme, darkTheme, lightTheme } from '@/rify';

export interface ThemeState {
  theme: 'light' | 'dark';
  rifyTheme: GlobalTheme;
  setTheme: (value: 'light' | 'dark') => void;
  toggleTheme: () => void;
}

export default create<ThemeState>()((set, get) => ({
  theme: 'light',
  rifyTheme: lightTheme,

  setTheme: value => {
    document.documentElement.dataset.theme = value;
    set({ theme: value, rifyTheme: value === 'light' ? lightTheme : darkTheme });
  },

  toggleTheme: () => {
    const current = get().theme;
    set({
      theme: current === 'light' ? 'dark' : 'light',
      rifyTheme: current === 'light' ? darkTheme : lightTheme,
    });
    document.documentElement.dataset.theme = get().theme;
  },
}));
