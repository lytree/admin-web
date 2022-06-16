import { request } from '../request';

/**
 * 获取系统配置
 * @param key - 配置组key
 * @returns - 配置项数组
 */
export function fetchSystemConfig(key: string) {
  return request.get<OptionsGroup>(`/admin/options_group/${key}`);
}
export function saveSystemConfig(option: Options) {
  return request.post<Options>(`/admin/options/create`, option);
}
export function saveSystemConfigs(options: Options[]) {
  return request.post<Options>(`/admin/options/batch_create`, options);
}
export function fetchSystemMenu() {
  return request.get<Menu>(`/admin/menus/tree_view`);
}

export interface Menu {
  id: string;
  slug: string;
  name: string;
  target: string;
  parentId: string;
  children: Menu[];
}

export interface Options {
  id: string;
  optionName: string;
  optionComponent: string;
  optionKey: string;
  optionValue: string;
  optionLevel: string;
  optionDesc?: string;
  status?: number;
}
export interface OptionsGroup {
  id: string;
  groupName: string;
  groupKey: string;
  optionList: Array<Options>;
}
