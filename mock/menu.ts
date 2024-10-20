import { MockMethod } from 'vite-plugin-mock';
import { RequestURL } from '../src/constants/RequestURL';
import { RouteTo } from '../src/constants/RouteTo';

export default [
  {
    url: '/api/' + RequestURL.MENU_LIST,
    method: 'get',
    response: () => {
      return {
        code: 200,
        message: '获取菜单列表成功',
        data: {
          front: [],
          backend: [
            {
              key: 'module.admin',
              title: 'Dashboard',
              order: 1,
              children: [
                {
                  key: 'admin',
                  title: '主控台',
                  to: RouteTo.ADMIN,
                },
                {
                  key: 'workbench',
                  title: '工作台',
                  to: RouteTo.WORKBENCH,
                },
              ],
            },
            {
              key: 'module.system',
              title: '系统管理',
              order: 2,
              children: [
                {
                  key: 'system.user',
                  title: '用户管理',
                  to: RouteTo.SYSTEM_USER,
                },
                {
                  key: 'system.role',
                  title: '角色管理',
                  to: RouteTo.SYSTEM_ROLE,
                },
                {
                  key: 'system.permission',
                  title: '权限管理',
                  to: RouteTo.SYSTEM_PERMISSION,
                },
                {
                  key: 'system.menu',
                  title: '菜单管理',
                  to: RouteTo.SYSTEM_MENU,
                },
              ],
            },
            {
              key: 'module.workflow',
              title: '流程管理',
              order: 3,
              children: [
                {
                  key: 'workflow.define',
                  title: '流程定义',
                  to: RouteTo.WORKFLOW_DEFINE,
                },
                {
                  key: 'workflow.design',
                  title: '流程设计',
                  to: RouteTo.WORKFLOW_DESIGN,
                },
              ],
            },
            {
              key: 'module.error',
              title: '异常页面',
              order: 4,
              children: [
                {
                  key: 'error.403',
                  title: '403页面',
                  blank: '_blank',
                  to: RouteTo.ERROR_403,
                },
                {
                  key: 'error.404',
                  title: '404页面',
                  blank: '_blank',
                  to: RouteTo.ERROR_404,
                },
                {
                  key: 'error.500',
                  title: '500页面',
                  blank: '_blank',
                  to: RouteTo.ERROR_500,
                },
              ],
            },
          ],
        },
      };
    },
  },
] as MockMethod[];
