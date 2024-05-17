/* 登录表单模型 */
interface LoginFormModel {
  username: string;
  password: string;
  captcha: string;
}

/* 注册表单模型 */
interface RegisterFormModel extends LoginFormModel {
  confirm: string;
}
