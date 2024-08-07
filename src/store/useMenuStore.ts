import { create } from 'zustand';
import { OptionType } from '@common/components';
import useAuth from '@/hooks/user/useAuth';
import useMenu from '@/hooks/bar/useMenu';

export interface MenuState {
  /** 系统菜单 */
  menus: { front: OptionType[]; backend: OptionType[] };
  /** 是否展开 */
  isExpand: boolean;
  /** 切换菜单展开状态 */
  switchExpand: () => void;
  /** 设置菜单展开状态 */
  setExpand: (value: boolean) => void;
  /** 获取菜单列表 */
  getMenuList: () => void;
}

const { isLogin } = useAuth();
const { getMenus } = useMenu();

export default create<MenuState>()(set => ({
  menus: { front: [], backend: [] },
  isExpand: true,

  switchExpand: () => set((state: MenuState) => ({ isExpand: !state.isExpand })),
  setExpand: (value: boolean) => set({ isExpand: value }),
  getMenuList: async () => {
    if (isLogin()) {
      const { front, backend } = await getMenus();
      set({ menus: { front, backend } });
    }
  },
}));
