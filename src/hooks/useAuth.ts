const storage = useStorage();

const data = { initial: false };

export const useAuth = () => {
  /**
   * 判断用户是否登录
   *
   * @returns {boolean} 返回一个 Boolean 类型的判断结果
   */
  const isAuthenticated = (): boolean => {
    return !!storage.get(CacheKey.TOKEN_NAME);
  };

  /** 是否初始化 */
  const initial = () => data.initial;

  /**
   * 初始化赋值
   *
   * @param initial - 初始化参数
   */
  const setInitial = (initial: boolean) => (data.initial = initial);

  return { isAuthenticated, initial, setInitial };
};

export type IAuth = ReturnType<typeof useAuth>;
