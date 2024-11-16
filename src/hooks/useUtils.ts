export default () => {
  /**
   * 判断当前对象是否为 Promise 函数
   *
   * @param value - 带判断的对象
   * @returns 返回一个 boolean 类型的判断结果
   */
  const isPromise = (value: any) => {
    return value !== null && typeof value === 'object' && typeof value.then === 'function';
  };

  return { isPromise };
};
