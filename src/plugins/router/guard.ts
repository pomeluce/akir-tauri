import { RouteRecord } from 'react-router-dom';
import { AxiosError } from 'axios';
import router from '.';

const { throwAxiosError } = useUtils();

// 初始化变量
let isInit = false;

//初始应用
const init = async () => {
  if (isInit) return;
  isInit = true;
  try {
    await Promise.all([useUserStore.getState().getCurrentUser(), useMenuStore.getState().getMenuList()]);
  } catch (e) {
    throwAxiosError(e as AxiosError);
  }
};

export default async (to: RouteRecord | undefined): Promise<boolean> => {
  // 初始化应用
  await init();
  const storage = useStorage();
  const { isLogin } = useAuth();

  // 访问需要登录的资源进行登录验证
  if (to?.meta?.auth && !isLogin()) {
    storage.set(CacheKey.REDIRECT_ROUTE_NAME, to.name);
    ArcoMessage.info({ content: '当前未登录或登录已过期' });
    router.root.navigate(RoutePath.LOGIN);
    return false;
  }

  // 如果是登录页面, 判断是否登录, 如果已经登录则跳转到首页
  if (to?.meta?.guest && isLogin()) {
    router.root.navigate(RoutePath.HOME);
    return false;
  }

  // 如果是登出, 则重置消息提示
  if (to?.name === RouteName.LOGIN) isInit = false;

  return true;
};
