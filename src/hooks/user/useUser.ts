import { http } from '@/plugins';

export default () => {
  /**
   * 获取当前已经登录的用户信息
   *
   * @returns {Promise<ResultModel<UserModel>>} 返回当前用户信息
   */
  const currentUser = (): Promise<ResultModel<UserModel, { role: string }>> => {
    return http.request<ResultModel<UserModel, { role: string }>>({ url: RequestURL.CURRENT_USER }, { message: false });
  };

  return { currentUser };
};
