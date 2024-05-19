import { create } from 'zustand';

export interface UserState {
  user: UserModel;
  isAdministrator: boolean;
  role: string;
  setUser: (value: UserModel) => void;
  getCurrentUser: () => void;
}

const { isLogin } = useAuth();
const { currentUser } = useUser();

export default create<UserState>()((set, get) => ({
  user: {} as UserModel,
  role: '',
  isAdministrator: get()?.role === 'admin',

  setUser: value => set({ user: value }),
  getCurrentUser: async () => {
    if (isLogin()) {
      const {
        data,
        body: { role },
      } = await currentUser();
      set({ user: data, role });
    }
  },
}));
