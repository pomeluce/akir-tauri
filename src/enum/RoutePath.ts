export enum RoutePath {
  /* front */
  HOME = '/',

  /* auth */
  LOGIN = '/auth/login',
  REGISTER = '/auth/register',

  /* admin */
  ADMIN = '/admin',
  WORKBENCH = '/admin/workbench',

  /* result */
  RESUALT_INFO = '/admin/result/info',
  RESUALT_SUCCESS = '/admin/result/success',
  RESUALT_FAILED = '/admin/result/failed',

  /* error */
  ERROR_403 = '/error/403',
  ERROR_404 = '/error/404',
  ERROR_500 = '/error/500',
}
