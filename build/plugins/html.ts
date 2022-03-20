import { createHtmlPlugin } from 'vite-plugin-html'; // html插件(使用变量、压缩)
import viteEnv from '../env';

export default [
  createHtmlPlugin({
    minify: true,
    inject: {
      data: {
        appName: viteEnv.VITE_APP_NAME,
        appTitle: viteEnv.VITE_APP_TITLE
      }
    }
  })
];
