import { defineStore } from 'pinia';
import { router, constantRoutes, routes as staticRoutes } from '@/router';
import {
  getUserInfo,
  transformAuthRouteToMenu,
  transformAuthRoutesToVueRoutes,
  transformAuthRoutesToSearchMenus,
  getCacheRoutes,
  transformRoutePathToRouteName,
  getConstantRouteNames
} from '@/utils';
import { useTabStore } from '../tab';

interface RouteState {
  /** 是否初始化了权限路由 */
  isInitAuthRoute: boolean;
  /** 路由首页name(前端静态路由时生效，后端动态路由该值会被后端返回的值覆盖) */
  routeHomeName: AuthRoute.RouteKey;
  /** 菜单 */
  menus: GlobalMenuOption[];
  /** 搜索的菜单 */
  searchMenus: AuthRoute.Route[];
  /** 缓存的路由名称 */
  cacheRoutes: string[];
}

export const useRouteStore = defineStore('route-store', {
  state: (): RouteState => ({
    isInitAuthRoute: false,
    routeHomeName: transformRoutePathToRouteName(import.meta.env.VITE_ROUTE_HOME_PATH),
    menus: [],
    searchMenus: [],
    cacheRoutes: []
  }),
  actions: {
    /** 重置路由的store */
    resetRouteStore() {
      this.resetRoutes();
      this.$reset();
    },
    /** 重置路由数据，保留固定路由 */
    resetRoutes() {
      const routes = router.getRoutes();
      const constantRouteNames = getConstantRouteNames(constantRoutes);
      routes.forEach(route => {
        const name: AuthRoute.RouteKey = (route.name || 'root') as AuthRoute.RouteKey;
        if (!constantRouteNames.includes(name)) {
          router.removeRoute(name);
        }
      });
    },
    /**
     * 处理权限路由
     * @param routes - 权限路由
     */
    handleAuthRoutes(routes: AuthRoute.Route[]) {
      this.menus = transformAuthRouteToMenu(routes);
      this.searchMenus = transformAuthRoutesToSearchMenus(routes);

      const vueRoutes = transformAuthRoutesToVueRoutes(routes);

      vueRoutes.forEach(route => {
        router.addRoute(route);
      });

      this.cacheRoutes = getCacheRoutes(vueRoutes);
    },
    /** 初始化动态路由 */
    async initDynamicRoute() {
      this.handleAuthRoutes(staticRoutes);
    },
    /** 初始化权限路由 */
    async initAuthRoute() {
      const { initHomeTab } = useTabStore();
      const { id } = getUserInfo();

      if (!id) return;
      await this.initDynamicRoute();

      initHomeTab(this.routeHomeName, router);

      this.isInitAuthRoute = true;
    }
  }
});
