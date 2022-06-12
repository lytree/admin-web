const comments: AuthRoute.Route = {
  name: 'comments',
  path: '/comments',
  component: 'basic',
  children: [
    {
      name: 'comments_list',
      path: '/comments/list',
      component: 'self',
      meta: {
        title: '文章评论',
        icon: 'icon-park-outline:analysis'
      }
    }
  ],
  meta: {
    title: '评论',
    icon: 'ant-design:comment-outlined',
    order: 6
  }
};

export default comments;
