const document: AuthRoute.Route = {
  name: 'document',
  path: '/document',
  component: 'basic',
  children: [
    {
      name: 'document_list',
      path: '/document/list',
      component: 'self',
      meta: {
        title: '所有文章',
        icon: 'mdi:circle-edit-outline'
      }
    },
    {
      name: 'document_edit',
      path: '/document/edit',
      component: 'self',
      meta: {
        title: '写文章',
        icon: 'ic:outline-edit'
      }
    },
    {
      name: 'document_categories',
      path: '/document/categories',
      component: 'self',
      meta: {
        title: '文章分类',
        icon: 'carbon:categories'
      }
    },
    {
      name: 'document_tags',
      path: '/document/tags',
      component: 'self',
      meta: {
        title: '文章标签',
        icon: 'mdi:tag'
      }
    }
  ],
  meta: {
    title: '文章',
    icon: 'carbon:document',
    order: 2
  }
};

export default document;
