import { request } from '../request';

/**
 *
 * @returns list
 */
export function list() {
  return request.get<Menu[]>(`/admin/menus`);
}
/**
 *
 * @returns list
 */
export function save(menu: Menu) {
  return request.post<Menu[]>(`/admin/menus/save`, menu);
}
/**
 *
 * @returns list
 */
export function treeView() {
  return request.get<Menu[]>(`/admin/menus/tree_view`);
}
/** 后端返回的路由相关类型 */

export interface Menu {
  id: string;
  slugName: string;
  slug: string;
  parentId: string;
  description: string;
  icon: string;
  priority?: number;
  children?: Menu[];
}
