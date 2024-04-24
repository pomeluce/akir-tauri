export default () => {
  /**
   * request 方法, 用于防止重复请求, 限制点击频率
   * @param fn 需要执行的函数
   * @return {(args?: any) => (undefined | Promise<any>)} 返回一个函数, 该函数接收一个参数, 并返回一个 Promise
   */
  const request = (fn: (args?: any) => Promise<any>): ((args?: any) => undefined | Promise<any>) => {
    let sendStatus = false;
    return (args?: any) => {
      if (sendStatus) return;
      sendStatus = true;
      return fn(args).finally(() => {
        sendStatus = false;
      });
    };
  };
  return { request };
};
