/* 请求结果模型 */
interface ResultModel<T, P = {}> {
  code: number;
  message: string;
  data: T;
  body: P;
}
