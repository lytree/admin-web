const dashboard: AuthRoute.Route = {
  name: 'dashboard',
  path: '/dashboard',
  component: 'basic',
  children: [
    {
      name: 'dashboard_analysis',
      path: '/dashboard/analysis',
      component: 'self',
      meta: {
        title: '分析页',
        icon: 'icon-park-outline:analysis'
      }
    },
    {
      name: 'dashboard_workbench',
      path: '/dashboard/workbench',
      component: 'self',
      meta: {
        title: '工作台',
        permissions: ['super', 'admin'],
        icon: 'icon-park-outline:workbench'
      }
    },
    {
      name: 'dashboard_user',
      path: '/dashboard/user',
      component: 'self',
      meta: {
        title: '个人信息',
        icon: 'carbon:user-filled'
      }
    }
  ],
  meta: {
    title: '仪表盘',
    icon: 'carbon:dashboard',
    order: 1
  }
};

export default dashboard;
