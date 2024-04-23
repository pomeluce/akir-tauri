import { useLoading as RifyLoading, useMessage } from '@/rify';
import Axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

export default (defaults: AxiosRequestConfig, config: AxiosConfig) => {
  const storage = useStorage();
  const RifyMessage = useMessage();
  const { navigator } = useRouter();

  const axios = {
    instance: Axios.create(defaults),
    options: { loading: true, message: true } as AxiosOptions,
    config,
  } as {
    instance: AxiosInstance;
    // loading 对象
    loading: any;
    // 参数对象
    options: AxiosOptions;
    // axios 参数配置
    config: AxiosConfig;
  };

  axios.instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      // 如果 loading 对象不存在且开启了 loading, 则创建一个 loading 对象
      if (!axios.loading && axios.options.loading) {
        axios.loading = RifyLoading();
      }
      // 获取 token
      const token = storage.get(CacheKey.TOKEN_NAME);
      // 开启 token 认证;
      axios.config.useTokenAuthorization && token && (config.headers.Authorization = token);
      // 设置 accept
      config.headers.Accept = 'application/json';
      // 添加自定义头部
      config.headers['rify-header'] = axios.config.header;
      return config;
    },
    (error: any) => Promise.reject(error),
  );

  axios.instance.interceptors.response.use(
    (response: AxiosResponse) => {
      // 如果 loading 对象存在, 则关闭 loading 对象
      if (axios.loading) {
        axios.loading.close();
        axios.loading = undefined;
      }
      // 判断 response 是否携带有 refresh_token
      if (!!response.headers['refresh-token']) storage.set(CacheKey.TOKEN_NAME, response.headers['refresh-token']);
      // 判断是否展示提示消息
      if (response.data?.msg && axios.options.message) {
        RifyMessage[response.data.code === 200 ? 'success' : 'error'](response.data.msg);
      }
      return response;
    },
    async (error: AxiosError) => {
      if (axios.loading) axios.loading.close() && (axios.loading = undefined);
      axios.options = { loading: true, message: true };
      const { response: { status, data, headers } = {} as AxiosResponse } = error;
      const { message } = data;

      // 判断 response 是否携带有 refresh_token
      if (!!headers['refresh-token']) storage.set(CacheKey.TOKEN_NAME, headers['refresh-token']);

      switch (status) {
        case HttpStatus.UNAUTHORIZED:
          storage.remove(CacheKey.TOKEN_NAME);
          navigator({ name: RouteName.ADMIN });
          break;
        case HttpStatus.UNPROCESSABLE_ENTITY:
          // useErrorStore().setErrors(error.response.data.errors);
          break;
        case HttpStatus.FORBIDDEN:
          RifyMessage.error(message ?? '没有操作权限');
          break;
        case HttpStatus.NOT_FOUND:
          RifyMessage.error(message ?? '请求资源不存在');
          navigator({ name: RouteName.ERROR_404 });
          break;
        case HttpStatus.TOO_MANY_REQUESTS:
          RifyMessage.warning(message ?? '请求过于频繁，请稍候再试');
          break;
        default:
          if (message) {
            RifyMessage.error(message ?? '服务器错误');
          }
      }
      return Promise.reject(error);
    },
  );

  /**
   * 请求发送方法
   * @param config 请求参数
   * @param options 加载及消息配置
   * @return {Promise<T>} 返回请求结果
   */
  const request = async <T,>(config: AxiosRequestConfig, options?: AxiosOptions): Promise<T> => {
    // 合并配置
    axios.options = Object.assign(axios.options, options ?? {});
    // 发送请求
    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios.instance.request<T>(config);
        resolve(response.data);
      } catch (error) {
        reject(error);
      }
    }) as Promise<T>;
  };

  return { request };
};
