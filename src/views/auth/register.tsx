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
              <Controller
                control={control}
                name="username"
                render={({ field }) => <ArcoInput placeholder="请输入用户名、邮箱或手机号" size="large" prefix={IconRiAccountBoxFill({ size: 18 })} {...field} />}
              />
              {errors.username && <ArcoAlert className="py-0.5" title={<span className="text-sm">{errors.username.message}</span>} type="error" />}
              <Controller
                control={control}
                name="password"
                render={({ field }) => <ArcoInput.Password placeholder="请输入登录密码" size="large" prefix={IconRiLockFill({ size: 18 })} {...field} />}
              />
              {errors.password && <ArcoAlert className="py-0.5" title={<span className="text-sm">{errors.password.message}</span>} type="error" />}
              <Controller
                control={control}
                name="confirm"
                render={({ field }) => <ArcoInput.Password placeholder="请再次输入密码" size="large" prefix={IconRiLockFill({ size: 18 })} {...field} />}
              />
              {errors.confirm && <ArcoAlert className="py-0.5" title={<span className="text-sm">{errors.confirm.message}</span>} type="error" />}
              <Controller
                control={control}
                name="captcha"
                render={({ field }) => (
                  <ArcoInput
                    type="text"
                    placeholder="请输入验证码"
                    size="large"
                    prefix={IconRiKeyFill({ size: 18 })}
                    addAfter={<ArcoImage className="w-20" preview={false} src={image} onClick={() => getCaptcha()} />}
                    {...field}
                  />
                )}
              />
              {errors.captcha && <ArcoAlert className="py-0.5" title={<span className="text-sm">{errors.captcha.message}</span>} type="error" />}
            </div>
            <ArcoButton className="w-full mt-5" type="primary" size="large" htmlType="submit">
              注册
            </ArcoButton>
            <Footer />
          </div>
        </div>
      </div>
    </form>
  );
};

export default register;
