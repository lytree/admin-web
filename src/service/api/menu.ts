import { request } from '../request';

/**
 *
 * @returns list
 */
export function list() {
  return request.get<Menu[]>(`/api/admin/menus`);
}
/**
 *
 * @returns list
 */
export function save(menu: Menu) {
  return request.post<Menu[]>(`/api/admin/menus/save`, menu);
}
/**
 *
 * @returns list
 */
export function treeView() {
  return request.get<Menu[]>(`/api/admin/menus/tree_view`);
}
/**
 *
 * @returns list
 */
export function deleteMenu(id: string) {
  return request.delete<Menu[]>(`/api/admin/menus/${id}`);
}
/** 后端返回的路由相关类型 */

export interface Menu {
  id: string;
  slugName: string;
  slug: string;
  parentId: string;
  target: string;
  icon: string;
  priority?: number;
  children?: Menu[];
}
