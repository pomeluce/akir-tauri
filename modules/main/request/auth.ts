import { http } from '@main/plugins';

const storage = useStorage();

/**
 * 登录接口
 *
 * @param data - 登录表单对象
 */
export const login = async (data: LoginFormModel) => {
  const { code, message, data: token } = await http.request<ResultModel<string>>({ url: RequestURL.LOGIN, method: 'POST', data }, { loading: true });
  if (code === 200) {
    storage.set(CacheKey.TOKEN_NAME, token);
    router.navigate({ to: storage.get(CacheKey.REDIRECT_ROUTE_NAME) || RouteTo.HOME });
    storage.remove(CacheKey.REDIRECT_ROUTE_NAME);
  } else {
    ArcoMessage.error({ content: message || '登录失败,请稍后重试!' });
  }
};

/**
 * 获取验证码
 *
 * @return {Promise<ResultModel<T>>} 返回一个 Promise 类型的请求结果
 */
export const captcha = <T,>(): Promise<ResultModel<T>> => {
  return http.request<ResultModel<T>>({ url: RequestURL.CAPTCHA }, { loading: false, message: false });
};
