export default () => {
  const topMenu = {
    menu: [
      { label: '首页', key: RoutePath.HOME },
      { label: '登录页', key: RoutePath.LOGIN },
      { label: '注册页', key: RoutePath.REGISTER },
      { label: '组件列表', key: RoutePath.COMPONENTS },
      { label: '系统后台', key: RoutePath.ADMIN },
    ],
  };
  const axios: AxiosConfig = {
    baseURL: '/api',
    // 开启 token 认证
    useTokenAuthorization: true,
    // 自定义请求头
    header: 'rapidify-react',
  };
  return { topMenu, axios };
};
