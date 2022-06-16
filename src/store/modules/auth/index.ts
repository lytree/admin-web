import { defineStore } from 'pinia';
import { useRouterPush } from '@/composables';
import { getUserInfo, getToken, setUserInfo, setToken, clearAuthStorage } from '@/utils';
import { fetchLogin } from '@/service/api/auth';
import { useTabStore } from '../tab';
import { useRouteStore } from '../route';

interface AuthState {
  /** 用户信息 */
  userInfo: ApiAuth.UserInfo;
  /** 用户token */
  token: string;
  /** 登录的加载状态 */
  loginLoading: boolean;
}

export const useAuthStore = defineStore('auth-store', {
  state: (): AuthState => ({
    userInfo: getUserInfo(),
    token: getToken(),
    loginLoading: false
  }),
  getters: {
    /** 是否登录 */
    isLogin(state) {
      return Boolean(state.token);
    }
  },
  actions: {
    /** 重置auth状态 */
    resetAuthStore() {
      const { toLogin } = useRouterPush(false);
      const { resetTabStore } = useTabStore();
      const { resetRouteStore } = useRouteStore();

      clearAuthStorage();
      this.$reset();
      resetTabStore();
      resetRouteStore();
      toLogin();
    },
    /**
     * 处理登录后成功或失败的逻辑
     * @param backendToken - 返回的token
     */
    async handleActionAfterLogin(backendToken: ApiAuth.UserInfo) {
      const { toLoginRedirect } = useRouterPush(false);

      setToken(backendToken.token);
      const loginSuccess = await this.loginByToken(backendToken);
      if (loginSuccess) {
        // 跳转登录后的地址
        toLoginRedirect();

        // 登录成功弹出欢迎提示
        window.$notification?.success({
          title: '登录成功!',
          content: `欢迎回来，${this.userInfo.username}!`,
          duration: 3000
        });

        return;
      }
      // 不成功则重置状态
      this.resetAuthStore();
    },
    /**
     * 根据token进行登录
     * @param backendToken - 返回的token
     */
    async loginByToken(backendToken: ApiAuth.UserInfo) {
      // 先把token存储到缓存中(后面接口的请求头需要token)
      const { token } = backendToken;
      setToken(token);
      // setRefreshToken(refreshToken);

      // 成功后把用户信息存储到缓存中
      setUserInfo(backendToken);

      // 更新状态
      this.userInfo = backendToken;
      this.token = backendToken.token;
      return true;
    },
    /**
     * 登录
     * @param userName - 用户名
     * @param password - 密码
     */
    async login(userName: string, password: string) {
      this.loginLoading = true;
      const req = await fetchLogin(userName, password);
      if (req.data) {
        await this.handleActionAfterLogin(req.data);
      }
      this.loginLoading = false;
    }
  }
});
