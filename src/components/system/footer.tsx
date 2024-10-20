const footer: React.FC<{}> = () => {
  return (
    <main className="flex justify-center gap-3 mt-8 text-sm text-word2">
      <Link to={RouteTo.LOGIN} activeProps={{ className: 'text-link1 font-bold' }}>
        用户登录
      </Link>
      <Link to={RouteTo.REGISTER} activeProps={{ className: 'text-link1 font-bold' }}>
        用户注册
      </Link>
      <Link to={RouteTo.HOME}>网站首页</Link>
    </main>
  );
};

export default footer;
