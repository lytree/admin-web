import qs from 'qs';
import { request } from '../request';

/**
 * 获取验证码
 * @param phone - 手机号
 * @returns - 返回boolean值表示是否发送成功
 */
export function fetchComment({ page = 0, size = 20, keyword = '', status = 0 }) {
  return request.get<PageInfo.Page<Comments>>(`/api/comment/page?${qs.stringify({ page, size, keyword, status })}`);
}

/** 后端返回的路由相关类型 */

export interface Comments {
  id: string;
  author: string;
  authorEmail: string;
  authorIp: string;
  date: string;
  status: string;
  postTitle: string;
}
