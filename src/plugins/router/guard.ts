import { RouteRecord } from 'react-router-dom';
import { useMessage } from '@/rify';
import router from '.';

// 初始化变量
let isInit = false;

//初始应用
const init = async () => {
  if (isInit) return;
  isInit = true;
  // const { getCurrentUser } = useUserStore();
  // try {
  //   await Promise.all([getCurrentUser()]);
  // } catch (e) {
  //   resolveErr(e as AxiosError);
  // }
};

export default async (to: RouteRecord | undefined) => {
  // 初始化应用
  // await init();
  const storage = useStorage();
  const { isLogin } = useAuth();

  // 访问需要登录的资源进行登录验证
  if (to?.meta?.auth && !isLogin()) {
    storage.set(CacheKey.REDIRECT_ROUTE_NAME, to.name);
    useMessage().info('当前未登录或登录已过期');
    router.navigate(RoutePath.LOGIN);
  }

  // 如果是登录页面, 判断是否登录, 如果已经登录则跳转到首页
  if (to?.meta?.guest && isLogin()) router.navigate(RoutePath.HOME);

  // 如果是登出, 则重置消息提示
  if (to?.name === RouteName.LOGIN) isInit = false;
};
