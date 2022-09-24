import { EnumStorageKey } from '@/model/enum';
import { setSession, getSession, removeSession } from '../storage';

/** 设置token */
export function setToken(token: string) {
  setSession(EnumStorageKey.token, token);
}

/** 获取token */
export function getToken() {
  return getSession<string>(EnumStorageKey.token) || '';
}

/** 去除token */
export function removeToken() {
  removeSession(EnumStorageKey.token);
}

/** 获取refresh token */
export function getRefreshToken() {
  return getSession<string>(EnumStorageKey['refresh-token']) || '';
}

/** 设置refresh token */
export function setRefreshToken(token: string) {
  setSession(EnumStorageKey['refresh-token'], token);
}

/** 去除refresh token */
export function removeRefreshToken() {
  removeSession(EnumStorageKey['refresh-token']);
}

/** 获取用户信息 */
export function getUserInfo() {
  const emptyInfo: ApiAuth.UserInfo = {
    id: '',
    username: '',
    token: ''
  };
  const userInfo: ApiAuth.UserInfo = getSession<ApiAuth.UserInfo>(EnumStorageKey['user-info']) || emptyInfo;
  return userInfo;
}

/** 设置用户信息 */
export function setUserInfo(userInfo: ApiAuth.UserInfo) {
  setSession(EnumStorageKey['user-info'], userInfo);
}

/** 去除用户信息 */
export function removeUserInfo() {
  removeSession(EnumStorageKey['user-info']);
}

/** 去除用户相关缓存 */
export function clearAuthStorage() {
  removeToken();
  removeRefreshToken();
  removeUserInfo();
}
