import { create } from 'zustand';

export interface MenuState {
  isExpand: boolean;
  switchExpand: () => void;
  setExpand: (value: boolean) => void;
}

export default create<MenuState>()(set => ({
  isExpand: true,

  switchExpand: () => set((state: MenuState) => ({ isExpand: !state.isExpand })),
  setExpand: (value: boolean) => set({ isExpand: value }),
}));
