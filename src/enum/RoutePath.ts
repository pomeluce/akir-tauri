export enum RoutePath {
  /* front */
  HOME = '/',

  /* auth */
  LOGIN = '/auth/login',
  REGISTER = '/auth/register',

  /* admin */
  ADMIN = '/admin',
  WORKBENCH = '/admin/workbench',

  /* system */
  SYSTEM_USER = '/admin/system/user',
  SYSTEM_ROLE = '/admin/system/role',
  SYSTEM_PERMISSION = '/admin/system/permission',
  SYSTEM_MENU = '/admin/system/menu',

  /* workflow */
  WORKFLOW_DEFINE = '/admin/workflow/define',
  WORKFLOW_DESIGN = '/admin/workflow/design',

  /* result */
  RESUALT_INFO = '/admin/result/info',
  RESUALT_SUCCESS = '/admin/result/success',
  RESUALT_FAILED = '/admin/result/failed',

  /* error */
  ERROR_403 = '/error/403',
  ERROR_404 = '/error/404',
  ERROR_500 = '/error/500',

  UNKNOWN = '*',
}
