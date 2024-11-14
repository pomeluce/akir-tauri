import { create } from 'zustand';
import { current } from '@main/request/user';

export interface UserState {
  user: UserModel;
  isAdministrator: boolean;
  role: string;
  setUser: (value: UserModel) => void;
  getCurrentUser: () => void;
}

const { isAuthenticated } = useAuth();

export default create<UserState>()((set, get) => ({
  user: {} as UserModel,
  role: '',
  isAdministrator: get()?.role === 'admin',

  setUser: value => set({ user: value }),
  getCurrentUser: async () => {
    if (isAuthenticated()) {
      const {
        data,
        body: { role },
      } = await current();
      set({ user: data, role });
    }
  },
}));
