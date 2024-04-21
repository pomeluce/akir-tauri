interface AxiosOptions {
  loading?: boolean;
  message?: boolean;
}

interface AxiosConfig {
  baseURL: string;
  useTokenAuthorization: boolean;
  header: string;
}
