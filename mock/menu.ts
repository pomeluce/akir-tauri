import { MockMethod } from 'vite-plugin-mock';
import { RequestURL } from '../src/enum/RequestURL';
import { RouteName } from '../src/enum/RouteName';

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
              key: RouteName.MODULE_ADMIN,
              label: 'Dashboard',
              type: 'submenu',
              order: 1,
              children: [
                {
                  key: RouteName.ADMIN,
                  label: '主控台',
                  type: 'item',
                },
                {
                  key: RouteName.WORKBENCH,
                  label: '工作台',
                  type: 'item',
                },
              ],
            },
            {
              key: RouteName.MODULE_SYSTEM,
              label: '系统管理',
              type: 'submenu',
              order: 2,
              children: [
                {
                  key: RouteName.SYSTEM_USER,
                  label: '用户管理',
                  type: 'item',
                },
                {
                  key: RouteName.SYSTEM_ROLE,
                  label: '角色管理',
                  type: 'item',
                },
                {
                  key: RouteName.SYSTEM_PERMISSION,
                  label: '权限管理',
                  type: 'item',
                },
                {
                  key: RouteName.SYSTEM_MENU,
                  label: '菜单管理',
                  type: 'item',
                },
              ],
            },
            {
              key: RouteName.MODULE_WORKFLOW,
              label: '流程管理',
              type: 'submenu',
              order: 3,
              children: [
                {
                  key: RouteName.WORKFLOW_DEFINE,
                  label: '流程定义',
                  type: 'item',
                },
                {
                  key: RouteName.WORKFLOW_DESIGN,
                  label: '流程设计',
                  type: 'item',
                },
              ],
            },
            {
              key: RouteName.MODULE_ERROR,
              label: '异常页面',
              type: 'submenu',
              order: 5,
              children: [
                {
                  key: RouteName.ERROR_403,
                  label: '403页面',
                  blank: '_blank',
                  type: 'item',
                },
                {
                  key: RouteName.ERROR_404,
                  label: '404页面',
                  blank: '_blank',
                  type: 'item',
                },
                {
                  key: RouteName.ERROR_500,
                  label: '500页面',
                  blank: '_blank',
                  type: 'item',
                },
              ],
            },
          ],
        },
      };
    },
  },
] as MockMethod[];
