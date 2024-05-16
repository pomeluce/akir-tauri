import RegisterBg from '@/assets/images/register-bg.svg';
import Footer from './footer';
import Illustration from './illustration';

const register: React.FC<{}> = () => {
  return (
    <form className="flex-1 flex justify-center">
      <div className="md:w-[720px] md:grid grid-cols-2 rounded-md shadow-md overflow-hidden bg-backdrop2">
        <div className="hidden md:block py-5">
          <main className="h-full flex justify-center items-center border-r border-rim2">
            <Illustration src={RegisterBg} />
          </main>
        </div>
        <div className="flex flex-col justify-between box-border p-5">
          <div>
            <h2 className="text-center text-word2 text-lg font-bold uppercase mt-3">rapidify-react</h2>
            <div className="mt-8 flex flex-col gap-4">
              <ArcoInput placeholder="请输入用户名、邮箱或手机号" size="large" prefix={<IconUser />} />
              <ArcoInput.Password placeholder="请输入登录密码" size="large" prefix={<IconLock />} />
              <ArcoInput.Password placeholder="请再次输入密码" size="large" prefix={<IconLock />} />
              <ArcoInput type="text" placeholder="请输入验证码" size="large" prefix={<IconKeyhole />} />
            </div>
            <ArcoButton className="w-full mt-5" type="primary" size="large">
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
