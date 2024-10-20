import { MenuType } from '@/config/menus';
import { http } from '@/plugins';
import { FileRoutesByPath } from '@tanstack/react-router';

/**
 * 获取当前已经登录的用户信息
 *
 * @returns {Promise<ResultModel<UserModel>>} 返回当前用户信息
 */
export const current = (): Promise<ResultModel<UserModel, { role: string }>> => {
  return http.request<ResultModel<UserModel, { role: string }>>({ url: RequestURL.CURRENT_USER }, { message: false });
};

export const menus = () => {
  return http.request<ResultModel<{ front: MenuType<FileRoutesByPath, 'fullPath'>[]; backend: MenuType<FileRoutesByPath, 'fullPath'>[] }>>(
    { url: RequestURL.MENU_LIST },
    { message: false },
  );
};
