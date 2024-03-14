export default () => {
  const topMenu = {
    menu: [
      { label: '首页', key: RoutePath.HOME },
      { label: '登录页', key: RoutePath.LOGIN },
      { label: '注册页', key: RoutePath.REGISTER },
      { label: '系统后台', key: RoutePath.ADMIN },
    ],
  };
  return { topMenu };
};
