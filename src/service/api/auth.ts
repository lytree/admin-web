import { mockRequest, request } from '../request';

/**
 * 获取验证码
 * @param phone - 手机号
 * @returns - 返回boolean值表示是否发送成功
 */
export function fetchSmsCode(phone: string) {
	return mockRequest.post<boolean>('./getSmsCode', { phone });
}

/**
 * 登录
 * @param userName - 用户名
 * @param password - 密码
 */
export function fetchLogin(userName: string, password: string) {
	const form = new FormData();
	form.append('username', userName);
	form.append('password', password);
	return request.form<ApiAuth.UserInfo>('/api/admin/login/userLogin', form);
}

/** 刷新token */
export function fetchRefresh() {
	return request.get<ApiAuth.UserInfo>('/api/admin/login/refresh');
}
/** 获取用户信息 */
export function fetchUserInfo() {
	return request.get<ApiAuth.UserInfo>('/api/admin/user/profiles');
}


export function updateUser(user: ApiAuth.UserInfo) {
	return request.post<void>('/api/admin/user/update/userinfo', user);
}
export function updatePassword(user: {
	oldPassword: string;
	newPassword: string;
	nextNewPassword: string;
}) {
	return request.post<void>('/admin/user/update/password', user);
}
