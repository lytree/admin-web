import { request } from '../request';

/**
 *
 * @returns list
 */
export function list() {
  return request.get<Category[]>(`/api/admin/category`);
}
/**
 *
 * @returns list
 */
export function save(category: Category) {
  return request.post<Category[]>(`/api/admin/category/save`, category);
}
/**
 *
 * @returns list
 */
export function treeView() {
  return request.get<Category[]>(`/api/admin/category/tree_view`);
}
/**
 *
 * @returns list
 */
export function deleteCategory(id: string) {
  return request.delete<Category[]>(`/api/admin/category/${id}`);
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
