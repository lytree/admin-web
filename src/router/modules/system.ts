const systemSetting: AuthRoute.Route = {
  name: 'system',
  path: '/system',
  component: 'basic',
  children: [
    {
      name: 'system_menu',
      path: '/system/menu',
      component: 'self',
      meta: {
        title: '目录设置',
        icon: 'cil:menu',
        order: 1
      }
    },
    {
      name: 'system_options',
      path: '/system/options',
      component: 'self',
      meta: {
        title: '设置',
        icon: 'fluent:settings-32-regular',
        order: 1
      }
    },

    {
      name: 'system_about',
      path: '/system/about',
      component: 'self',
      meta: {
        title: '关于',
        icon: 'fluent:book-information-24-regular',
        order: 2
      }
    }
  ],
  meta: {
    title: '系统设置',
    icon: 'fluent:app-store-24-regular',
    order: 9
  }
};
export default systemSetting;
