/* 请求结果模型 */
interface ResultModel<T> {
  code: number;
  message: string;
  data: T;
  body: any;
}
