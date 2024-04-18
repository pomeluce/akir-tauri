interface AxiosOptions {
  loading?: boolean;
  message?: boolean;
}

interface AxiosConfig {
  baseUrl: string;
  useTokenAuthorization: boolean;
  header: string;
}
