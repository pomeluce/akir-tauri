import { FileRoutesByPath } from '@tanstack/react-router';
import { create } from 'zustand';
import { menus } from '@main/request/user';
import { MenuType } from '@main/configs/menus';

export interface MenuState {
  /** 系统菜单 */
  menus: { front: MenuType<FileRoutesByPath, 'fullPath'>[]; backend: MenuType<FileRoutesByPath, 'fullPath'>[] };
  /** 是否展开 */
  isExpand: boolean;
  /** 切换菜单展开状态 */
  switchExpand: () => void;
  /** 设置菜单展开状态 */
  setExpand: (value: boolean) => void;
  /** 获取菜单列表 */
  getMenuList: () => void;
}

const { isAuthenticated } = useAuth();

export default create<MenuState>()(set => ({
  menus: { front: [], backend: [] },
  isExpand: true,

  switchExpand: () => set((state: MenuState) => ({ isExpand: !state.isExpand })),
  setExpand: (value: boolean) => set({ isExpand: value }),
  getMenuList: async () => {
    if (isAuthenticated()) {
      const {
        data: { front, backend },
      } = await menus();
      set({ menus: { front, backend } });
    }
  },
}));
