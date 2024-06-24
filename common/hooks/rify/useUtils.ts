import { AxiosError } from 'axios';
import { RouteLocation } from 'react-router-dom';

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

  /**
   * 判断当前对象是否为 Promise 函数
   *
   * @param value - 带判断的对象
   * @returns 返回一个 boolean 类型的判断结果
   */
  const isPromise = (value: any) => {
    return value !== null && typeof value === 'object' && typeof value.then === 'function';
  };

  /**
   * 路由跳转函数
   *
   * @param route - 路由对象
   * @param target - 跳转方式, 默认为 _self
   */
  const open = (route: RouteLocation, target: string = '_self') => {
    const path = route.fullPath;
    target === '_blank' ? window.open(path) : (location.href = path);
  };

  return { throwAxiosError, isPromise, open };
};
