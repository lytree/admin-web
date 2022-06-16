import { request } from '../request';

/**
 *
 * @returns list
 */
export function list() {
  return request.get<Category[]>(`/admin/category`);
}
/**
 *
 * @returns list
 */
export function save(category: Category) {
  return request.post<void>(`/admin/category/save`, category);
}
/** 后端返回的路由相关类型 */

export interface Category {
  id: string;
  slugName: string;
  slug: string;
  parentId: string;
  description: string;
  thumbnail: string;
  priority?: number;
  children?: Category[];
}
