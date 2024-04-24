import { MenuOptionType } from '@/rify';
import { http } from '@/plugins';

export default () => {
  const menu = () => {
    return http.request<ResultModel<{ front: MenuOptionType[]; admin: MenuOptionType[] }>>({ url: RequestURL.MENU_LIST });
  };

  return { menu };
};
