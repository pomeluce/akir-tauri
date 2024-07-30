import { router } from '@/plugins';

const footer: React.FC<{}> = () => {
  const { record } = router;

  return (
    <main className="flex justify-center gap-3 mt-8 text-sm text-word2">
      <Link to={RoutePath.LOGIN} className={record.route.name === RouteName.LOGIN ? 'text-link1 font-bold' : ''}>
        用户登录
      </Link>
      <Link to={RoutePath.REGISTER} className={record.route.name === RouteName.REGISTER ? 'text-link1 font-bold' : ''}>
        用户注册
      </Link>
      <Link to={RoutePath.HOME}>网站首页</Link>
    </main>
  );
};

export default footer;
