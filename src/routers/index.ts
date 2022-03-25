import { createRouter, createWebHistory } from 'vue-router';
import { App } from 'vue';
import web from './web';
import admin from './admin';

const router = createRouter({
  history: createWebHistory(),
  routes: [...web, ...admin]
});
export async function setupRouter(app: App) {
  app.use(router);
  // createRouterGuide(router);
  await router.isReady();
}
