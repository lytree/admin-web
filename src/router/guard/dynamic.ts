import type { RouteLocationNormalized, NavigationGuardNext } from 'vue-router';
import { routeName } from '@/router';
import { useRouteStore } from '@/store';
import { getToken } from '@/utils';

/**
 * 动态路由
 */
export async function createDynamicRouteGuard(
  to: RouteLocationNormalized,
  _from: RouteLocationNormalized,
  next: NavigationGuardNext
) {
  const route = useRouteStore();
  const isLogin = Boolean(getToken());

  // 未登录情况下直接回到登录页，登录成功后再加载权限路由
  if (!isLogin) {
    if (to.name === routeName('login')) {
      next();
    } else {
      const redirect = to.fullPath;
      next({ name: routeName('login'), query: { redirect } });
    }
    return false;
  }

  await route.initAuthRoute();

  if (to.name === routeName('not-found-page')) {
    // 动态路由没有加载导致被not-found-page路由捕获，等待权限路由加载好了，回到之前的路由
    next({ path: to.fullPath, replace: true, query: to.query });
    return false;
  }
  return true;
}
