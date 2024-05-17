import { http } from '@/plugins';

const storage = useStorage();

export default () => {
  /**
   * 判断用户是否登录
   *
   * @return {boolean} 返回一个 Boolean 类型的判断结果
   */
  const isLogin = (): boolean => {
    return !!storage.get(CacheKey.TOKEN_NAME);
  };

  /**
   * 登录接口
   *
   * @type {(args?: any) => (undefined | Promise<any>)} 传入一个登录请求函数
   */
  // const login: (args?: any) => undefined | Promise<any> = request(async (data: LoginBody) => {
  //   try {
  //     const {
  //       code,
  //       message,
  //       data: token,
  //     } = await http.request<ResultModel<string>>({
  //       url: RequestURL.LOGIN,
  //       method: 'POST',
  //       data,
  //     });
  //     if (code === 200) {
  //       storage.set(CacheKey.TOKEN_NAME, token);
  //       await router.push({ path: storage.get(CacheKey.REDIRECT_ROUTE_NAME) || '/' });
  //     } else {
  //       RifyMessage({ type: 'error', content: message || '登录失败,请稍后重试!' });
  //     }
  //   } catch (error) {
  //     resolveErr(error as AxiosError);
  //   }
  // });

  /**
   * 获取验证码
   *
   * @return {Promise<ResultModel<T>>} 返回一个 Promise 类型的请求结果
   */
  const captcha = <T,>(): Promise<ResultModel<T>> => {
    return http.request<ResultModel<T>>({ url: RequestURL.CAPTCHA }, { loading: false, message: false });
  };

  return { isLogin, /* login, */ captcha };
};
