import RegisterBg from '@/assets/images/register-bg.svg';
import Footer from './footer';
import Illustration from './illustration';
import { Controller } from 'react-hook-form';

const register: React.FC<{}> = () => {
  const { captcha } = useAuth();
  const { registerValidate } = useValidate();

  const [image, setImage] = useState<string>('');

  const getCaptcha = async () => {
    const result = await captcha<CaptchaModel>();
    setImage('data:image/png;base64,' + result.data.image);
  };

  useAsyncEffect(getCaptcha, []);

  const { control, handleSubmit, errors } = registerValidate();
  const submit = (data: RegisterFormModel) => {
    console.log(data);
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
            <Illustration src={RegisterBg} />
          </main>
        </div>
        <div className="flex flex-col justify-between box-border p-5">
          <div>
            <h2 className="text-center text-word2 text-lg font-bold uppercase mt-3">rapidify-react</h2>
            <div className="mt-8 flex flex-col gap-4">
              <Controller name="username" control={control} render={({ field }) => <SuiInput placeholder="请输入用户名、邮箱或手机号" {...field} />} />
              {errors.username && tips(errors.username.message)}
              <Controller name="password" control={control} render={({ field }) => <SuiInput placeholder="请输入登录密码" type="password" {...field} />} />
              {errors.password && tips(errors.password.message)}
              <Controller name="confirm" control={control} render={({ field }) => <SuiInput placeholder="请再次输入密码" type="password" {...field} />} />
              {errors.confirm && tips(errors.confirm.message)}
              <Controller
                name="captcha"
                control={control}
                render={({ field }) => (
                  <span className="flex items-center gap-1">
                    <SuiInput type="text" placeholder="请输入验证码" {...field} />
                    <img className="h-8" src={image} onClick={() => getCaptcha()} />
                  </span>
                )}
              />
              {errors.captcha && tips(errors.captcha.message)}
            </div>
            <SuiButton className="w-full mt-5" size="lg" type="submit">
              注册
            </SuiButton>
            <Footer />
          </div>
        </div>
      </div>
    </form>
  );
};

export default register;
