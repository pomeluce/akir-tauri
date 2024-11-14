import LoginBg from '@main/assets/images/login-bg.svg';
import { Footer, Illustration } from '@main/components';
import { captcha, login } from '@main/request/auth';

export const Route = createFileRoute('/auth/login')({
  beforeLoad: ctx => useRouterGuard(ctx, { loginView: true }),
  component: () => {
    const { loginValidate } = useValidate();

    const [image, setImage] = useState<string>('');
    const [uid, setUid] = useState<string>('');

    const getCaptcha = async () => {
      const { data } = await captcha<CaptchaModel>();
      setImage('data:image/png;base64,' + data.image);
      setUid(data.uid);
    };

    useAsyncEffect(getCaptcha, []);

    const { register, handleSubmit, errors } = loginValidate();
    const submit = (data: LoginFormModel) => {
      data.uid = uid;
      login(data);
    };

    const tips = (value: string | undefined) => (
      <SuiAlert className="py-2" variant="destructive">
        <SuiAlertTitle className="flex gap-2 m-0">
          <IconRiCloseCircleFill />
          <span>{value}</span>
        </SuiAlertTitle>
      </SuiAlert>
    );

    return (
      <form className="min-w-xs max-w-2/3 md:max-w-none flex-1 flex justify-center" onSubmit={handleSubmit(submit)}>
        <div className="md:w-[720px] md:grid grid-cols-2 rounded-xl shadow-md overflow-hidden bg-backdrop2 p-5">
          <div className="hidden md:block py-5">
            <main className="h-full flex justify-center items-center border-r border-rim2">
              <Illustration src={LoginBg} />
            </main>
          </div>
          <div className="flex flex-col justify-between box-border p-5">
            <div>
              <h2 className="text-center text-word2 text-lg font-bold uppercase mt-3">rapidify-react</h2>
              <div className="mt-8 flex flex-col gap-4">
                <SuiInput placeholder="请输入用户名、邮箱或手机号" {...register('username')} />
                {errors.username && tips(errors.username.message)}
                <SuiInput placeholder="请输入登录密码" type="password" {...register('password')} />
                {errors.password && tips(errors.password.message)}
                <span className="flex items-center gap-1">
                  <SuiInput type="text" placeholder="请输入验证码" {...register('captcha')} />
                  <img className="h-8" src={image} onClick={() => getCaptcha()} />
                </span>
                {errors.captcha && tips(errors.captcha.message)}
              </div>
              <div className="flex justify-between mt-5">
                <span className="flex items-center gap-1">
                  <SuiCheckbox id="remember" />
                  <SuiLabel htmlFor="remember">记住我</SuiLabel>
                </span>
                <SuiButton variant="link">忘记密码</SuiButton>
              </div>
              <SuiButton className="w-full mt-5" size="lg" type="submit">
                登录
              </SuiButton>
              <Footer />
            </div>
          </div>
        </div>
      </form>
    );
  },
});
