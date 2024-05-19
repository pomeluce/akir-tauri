import { AxiosError } from 'axios';

export default () => {
  /**
   * axios 请求异常处理
   * @param error - 请求异常对象
   */
  const throwAxiosError = (error: AxiosError) => {
    const {
      request: { status, statusText, responseURL },
    } = error;
    console.error(`Interface Anonymous Access ${status} ${statusText}: ${responseURL}`);
  };

  return { throwAxiosError };
};
