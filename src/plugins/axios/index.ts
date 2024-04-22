import Axios from './Axios';

const { axios } = config();
// 创建 axios 实例
const http = new Axios(
  {
    // 请求前缀
    baseURL: axios.baseURL,
    // 超时时间
    timeout: 10000,
    // 请求头设置
    headers: {
      'content-type': 'application/json;charset=UTF-8',
    },
    // 跨域请求携带 cookie
    withCredentials: true,
  },
  axios,
);

export default http;
