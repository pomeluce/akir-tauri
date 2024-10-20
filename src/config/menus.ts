import { IconType } from 'react-icons/lib';
import { RiDashboard3Line, RiFlowChart, RiSettings2Line, RiToolsFill } from 'react-icons/ri';

export type MenuType<T, F extends keyof T[keyof T]> = {
  key: string;
  title: string;
  to: T[keyof T][F];
  order?: number;
  blank?: string;
  children?: MenuType<T, F>[];
};

export const menuIcons: Record<string, IconType> = {
  'module.admin': RiDashboard3Line,
  'module.system': RiSettings2Line,
  'module.workflow': RiFlowChart,
  'module.error': RiToolsFill,
};

export const topMenus = [
  { label: '首页', key: RouteTo.HOME },
  { label: '登录页', key: RouteTo.LOGIN },
  { label: '注册页', key: RouteTo.REGISTER },
  { label: '组件列表', key: RouteTo.COMPONENTS },
  { label: '系统后台', key: RouteTo.ADMIN },
];
