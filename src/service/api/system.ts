import { request } from '../request';

/**
 * 获取系统配置
 * @param key - 配置组key
 * @returns - 配置项数组
 */
export function fetchSystemConfig(key: string) {
  return request.get<OptionsGroup>(`/api/admin/options_group/${key}`);
}
export interface Options {
  id: string;
  optionName: string;
  optionComponents: string;
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
