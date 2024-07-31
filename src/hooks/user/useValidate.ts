import { UseFormProps, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { yup } from '@common/plugins';

export default () => {
  /**
   * 登录表单验证
   *
   * @param defaultValues - 表单默认值
   * @returns 返回表单验证结果
   */
  const loginValidate = (defaultValues?: UseFormProps<LoginFormModel>['defaultValues']) => {
    const { handleSubmit, formState, register } = useForm<LoginFormModel>({
      defaultValues,
      resolver: yupResolver(
        yup
          .object({
            username: yup.string().required().email().label('邮箱'),
            password: yup.string().required().min(8).label('密码'),
            captcha: yup.string().required().label('验证码'),
          })
          .required(),
      ),
      mode: 'onBlur',
      reValidateMode: 'onBlur',
    });
    return { formState, handleSubmit, errors: formState.errors, register };
  };

  /**
   * 注册表单验证
   *
   * @param defaultValues - 表单默认值
   * @returns 返回表单验证结果
   */
  const registerValidate = (defaultValues?: UseFormProps<RegisterFormModel>['defaultValues']) => {
    const { handleSubmit, formState, register } = useForm<RegisterFormModel>({
      defaultValues,
      resolver: yupResolver(
        yup
          .object({
            username: yup.string().required().email().label('邮箱'),
            password: yup.string().required().min(8).label('密码'),
            confirm: yup
              .string()
              .required()
              .oneOf([yup.ref('password')], '两次密码不一致')
              .label('确认密码'),
            captcha: yup.string().required().label('验证码'),
          })
          .required(),
      ),
      mode: 'onBlur',
      reValidateMode: 'onBlur',
    });
    return { formState, handleSubmit, errors: formState.errors, register };
  };

  return { loginValidate, registerValidate };
};
