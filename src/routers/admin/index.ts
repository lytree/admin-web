import { ImportedRouteModules, transformRouteModules } from '../../utils/router/helpers';
import { Login, NoPermission, NotFound, ServiceError } from '@/views/admin';
import { BasicLayout, BlankLayout } from '@/layout/admin';

const modules = import.meta.globEager('./**/$*.{ts}') as ImportedRouteModules;

const customRoutes = transformRouteModules(modules);
const adminRouter = [
  {
    // 名称、路径随意，不在路由声明里面，只是为各个子路由充当应用BlankLayout布局的桥梁，因此访问该路由时重定向到404
    name: 'admin',
    path: '/admin',
    component: BlankLayout,
    redirect: { name: 'not-found' },
    meta: {
      title: 'constant-single_',
      keepAlive: true
    },
    children: [
      // 登录
      {
        name: 'login',
        path: `'login'/:module(${getLoginModuleRegExp()})?`,
        component: Login,
        props: route => {
          const moduleType = (route.params.module as LoginModuleType) || 'pwd-login';
          return {
            module: moduleType
          };
        },
        meta: {
          title: 'login',
          fullPage: true
        }
      },
      // 403
      {
        name: 'no-permission',
        path: 'no-permission',
        component: NoPermission,
        meta: {
          title: 'no-permission',
          fullPage: true
        }
      },
      // 404
      {
        name: 'not-found',
        path: 'not-found',
        component: NotFound,
        meta: {
          title: 'not-found',
          fullPage: true
        }
      },
      // 500
      {
        name: 'service-error',
        path: 'service-error',
        component: ServiceError,
        meta: {
          title: 'service-error',
          fullPage: true
        }
      }
    ],
    ...customRoutes
  },
  // 匹配无效的路径重定向404
  {
    path: '/:pathMatch(.*)*',
    redirect: { name: 'not-found' }
  }
];

export default adminRouter;
/** 获取登录模块的正则字符串 */
function getLoginModuleRegExp() {
  const modules: LoginModuleType[] = ['pwd-login', 'code-login', 'register', 'reset-pwd', 'bind-wechat'];
  return modules.join('|');
}
/** 登录模块 */
type LoginModuleType = keyof typeof EnumLoginModule;
/** 登录模块 */
export enum EnumLoginModule {
  'pwd-login' = '账密登录',
  'code-login' = '手机验证码登录',
  'register' = '注册',
  'reset-pwd' = '重置密码',
  'bind-wechat' = '微信绑定'
}
