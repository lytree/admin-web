const attachments: AuthRoute.Route = {
  name: 'attachments',
  path: '/attachments',
  component: 'basic',
  children: [
    {
      name: 'attachments_photo',
      path: '/attachments/photo',
      component: 'self',
      meta: {
        title: '图片',
        icon: 'ic:baseline-photo-size-select-actual'
      }
    },
    {
      name: 'attachments_sheets',
      path: '/attachments/sheets',
      component: 'self',
      meta: {
        title: '页面',
        icon: 'mdi:page-next-outline'
      }
    }
  ],
  meta: {
    title: '资源',
    icon: 'carbon:software-resource-cluster',
    order: 6
  }
};

export default attachments;
