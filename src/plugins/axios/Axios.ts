import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

// 获取 storage 对象
export default class Axios {
  // axios 实例
  private instance: AxiosInstance;
  // loading 对象
  private loading: any;
  // 参数对象
  private options: AxiosOptions = { loading: true, message: true };
  // axios 参数配置
  private config: AxiosConfig;

  /**
   * 构造函数, 初始化 axios 实例
   * @param defaults axios 配置
   * @param config axios 参数配置
   */
  constructor(defaults: AxiosRequestConfig, config: AxiosConfig) {
    this.instance = axios.create(defaults);
    this.config = config;
    this.initInterceptors();
  }

  /**
   * 加载拦截器
   */
  private initInterceptors() {
    this.interceptorsRequest();
    this.interceptorsResponse();
  }

  /**
   * 请求发送方法
   * @param config 请求参数
   * @param options 加载及消息配置
   * @return {Promise<T>} 返回请求结果
   */
  public request = async <T,>(config: AxiosRequestConfig, options?: AxiosOptions): Promise<T> => {
    // 合并配置
    this.options = Object.assign(this.options, options ?? {});
    // 发送请求
    return new Promise(async (resolve, reject) => {
      try {
        const response = await this.instance.request<T>(config);
        resolve(response.data);
      } catch (error) {
        reject(error);
      }
    }) as Promise<T>;
  };

  /**
   * 请求拦截器
   */
  private interceptorsRequest() {
    this.instance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        // 如果 loading 对象不存在且开启了 loading, 则创建一个 loading 对象
        if (!this.loading && this.options.loading) {
          // this.loading = RifyLoading({ bgColor: 'rgba(0,0,0,0.15)' });
        }
        // 获取 token
        // const token = storage.get(CacheKey.TOKEN_NAME);
        // 开启 token 认证;
        // this.axiosConf.useTokenAuthorization && token && (config.headers.Authorization = token);
        // 设置 accept
        // config.headers.Accept = 'application/json';
        // 添加自定义头部
        // config.headers['rapidify-header'] = this.axiosConf.rifyHeader;
        return config;
      },
      (error: any) => Promise.reject(error),
    );
  }

  /**
   * 响应拦截器
   */
  private interceptorsResponse() {
    this.instance.interceptors.response.use(
      (response: AxiosResponse) => {
        // 如果 loading 对象存在, 则关闭 loading 对象
        if (this.loading) {
          this.loading.close();
          this.loading = undefined;
        }
        // 判断 response 是否携带有 refresh_token
        // if (!!response.headers['refresh-token']) storage.set(CacheKey.TOKEN_NAME, response.headers['refresh-token']);
        // 判断是否展示提示消息
        if (response.data?.msg && this.options.message) {
          // RifyMessage({
          //   type: response.data.code === 200 ? 'success' : 'error',
          //   content: response.data.msg,
          //   duration: 2000,
          // });
        }
        return response;
      },
      async (error: AxiosError) => {
        if (this.loading) this.loading.close() && (this.loading = undefined);
        this.options = { loading: true, message: true };
        const { response: { status, data, headers } = {} as AxiosResponse } = error;
        const { message } = data;

        // 判断 response 是否携带有 refresh_token
        // if (!!headers['refresh-token']) storage.set(CacheKey.TOKEN_NAME, headers['refresh-token']);

        switch (status) {
          case HttpStatus.UNAUTHORIZED:
            // storage.remove(CacheKey.TOKEN_NAME);
            // await router.push({ name: RouteName.LOGIN });
            break;
          case HttpStatus.UNPROCESSABLE_ENTITY:
            // useErrorStore().setErrors(error.response.data.errors);
            break;
          case HttpStatus.FORBIDDEN:
            // RifyMessage({ type: 'error', content: message ?? '没有操作权限' });
            break;
          case HttpStatus.NOT_FOUND:
            // RifyMessage({ type: 'error', content: message ?? '请求资源不存在' });
            // await router.push({ name: RouteName.NOT_FOUND });
            break;
          case HttpStatus.TOO_MANY_REQUESTS:
            // RifyMessage({ type: 'error', content: message ?? '请求过于频繁，请稍候再试' });
            break;
          default:
            if (message) {
              // RifyMessage({ type: 'error', content: message ?? '服务器错误' });
            }
        }
        return Promise.reject(error);
      },
    );
  }
}
