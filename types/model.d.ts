/* 请求结果模型 */
interface ResultModel<T> {
  code: number;
  message: string;
  data: T;
  body: any;
}

interface UserModel {
  id: number;
  name: string;
  email: string;
  gender: number;
  avatar: string;
  phone: string;
  technique: string[];
  createTime: number;
  updateTime: number;
}
