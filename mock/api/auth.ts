import type { MockMethod } from 'vite-plugin-mock';

const apis: MockMethod[] = [
  // 获取验证码
  {
    url: '/mock/getSmsCode',
    method: 'post',
    response: (): Service.MockServiceResult<boolean> => {
      return {
        code: 200,
        message: 'ok',
        data: true
      };
    }
  }
];

export default apis;
