import { RouteRecordRaw } from 'vue-router';

const router: RouteRecordRaw[] = [
  {
    // 名称、路径随意，不在路由声明里面，只是为各个子路由充当应用BlankLayout布局的桥梁，因此访问该路由时重定向到404
    name: 'web',
    path: '/',
    component: () => import('@/layout/web/WebLayout/index.vue'),
    redirect: '/index',
    meta: {
      title: 'constant-single_',
      keepAlive: true
    },
    children: [
      {
        name: 'index',
        path: '/index',
        component: () => import('@/views/web/Nav.vue'),
        meta: {
          title: 'constant-single_',
          keepAlive: true
        }
      }
    ]
  },
  // 匹配无效的路径重定向404
  {
    path: '/:pathMatch(.*)*',
    redirect: { name: 'not-found' }
  }
];

export default router;
