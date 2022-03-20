import type { MockMethod } from 'vite-plugin-mock';

export default [
  {
    url: '/api/getUser',
    method: 'get',
    response: () => {
      return {
        code: 200,
        message: 'ok',
        data: '测试mock数据'
      };
    }
  }
] as MockMethod[];
