import { http } from '@/plugins';

const storage = useStorage();

export default () => {
  /**
   * 判断用户是否登录
   *
   * @returns {boolean} 返回一个 Boolean 类型的判断结果
   */
  const isLogin = (): boolean => {
    return !!storage.get(CacheKey.TOKEN_NAME);
  };

  /**
   * 登录接口
   *
   * @param data - 登录表单对象
   */
  const login = async (data: LoginFormModel) => {
    const { code, message, data: token } = await http.request<ResultModel<string>>({ url: RequestURL.LOGIN, method: 'POST', data }, { loading: true });
    if (code === 200) {
      storage.set(CacheKey.TOKEN_NAME, token);
      useRouter().navigator({ name: storage.get(CacheKey.REDIRECT_ROUTE_NAME) || RouteName.HOME });
    } else {
      ArcoMessage.error({ content: message || '登录失败,请稍后重试!' });
    }
  };

  /**
   * 获取验证码
   *
   * @return {Promise<ResultModel<T>>} 返回一个 Promise 类型的请求结果
   */
  const captcha = <T,>(): Promise<ResultModel<T>> => {
    return http.request<ResultModel<T>>({ url: RequestURL.CAPTCHA }, { loading: false, message: false });
  };

  return { isLogin, login, captcha };
};
