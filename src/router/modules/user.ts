const systemSetting: AuthRoute.Route = {
  name: 'user',
  path: '/user',
  component: 'basic',
  children: [
    {
      name: 'user_profile',
      path: '/user/profile',
      component: 'self',
      meta: {
        title: '个人设置',
        icon: 'fluent:person-settings-20-regular',
        order: 1
      }
    }
  ],
  meta: {
    title: '用户设置',
    icon: 'fluent:person-settings-20-regular',
    order: 9
  }
};
export default systemSetting;
