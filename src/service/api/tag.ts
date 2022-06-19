import { request } from '../request';

/**
 *
 * @returns list
 */
export function list() {
  return request.get<Tag[]>(`/admin/tag`);
}
/**
 *
 * @returns list
 */
export function save(tag: Tag) {
  return request.post<Tag[]>(`/admin/tag/save`, tag);
}
/**
 *
 * @returns list
 */
export function deleteTag(id: string) {
  return request.delete<Tag[]>(`/admin/tag/${id}`);
}
/** 后端返回的路由相关类型 */

export interface Tag {
  id: string;
  slugName: string;
  slug: string;
  color: string;
  thumbnail: string;
}
