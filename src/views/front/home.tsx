import http from '@/plugins/axios';
import { useMessage } from '@/rify';

const Home: React.FC<{}> = () => {
  // const http = useAxios();
  const handleClick = async () => {
    // const result = await http.request<ResultModel<UserModel>>({ url: RequestURL.CURRENT_USER });
    // console.log(result);
    useMessage().success('这是成功消息');
  };
  return (
    <RifyCard className="h-2000px" title="首页">
      <RifyButton onClick={handleClick}> info </RifyButton>
    </RifyCard>
  );
};

export default Home;
