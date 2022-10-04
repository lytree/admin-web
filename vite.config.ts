import { fileURLToPath } from 'url';
import { defineConfig, loadEnv } from 'vite';
import { viteDefine, setupVitePlugins, createViteProxy } from './build';
import { getEnvConfig } from './.env-config';

export default defineConfig((configEnv: { mode: any; }) => {
  const viteEnv = loadEnv(configEnv.mode, process.cwd()) as ImportMetaEnv;

  const rootPath = fileURLToPath(new URL('./', import.meta.url));
  const srcPath = `${rootPath}src`;

  const isOpenProxy = viteEnv.VITE_HTTP_PROXY === 'true';
  const envConfig = getEnvConfig(viteEnv);

  return {
    base: viteEnv.VITE_BASE_URL,
    resolve: {
      alias: {
        '~': rootPath,
        '@': srcPath
      }
    },
    define: viteDefine,
    plugins: setupVitePlugins(viteEnv, srcPath),
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "./src/styles/scss/global.scss" as *;`
        }
      }
    },
    server: {
      host: '0.0.0.0',
      port: 3200,
      open: true,
      proxy: createViteProxy(isOpenProxy, envConfig)
    },
    preview: {
      port: 5050
    },
    build: {
      brotliSize: false,
      sourcemap: false,
      commonjsOptions: {
        ignoreTryCatch: false
      },
      outDir: '../src/main/resources/static/admin',
      emptyOutDir: true,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return id
                .toString()
                .split('node_modules/')[1]
                .split('/')[0]
                .toString();
            }
          },
          chunkFileNames: (chunkInfo) => {
            const facadeModuleId = chunkInfo.facadeModuleId
              ? chunkInfo.facadeModuleId.split('/')
              : [];
            const fileName =
              facadeModuleId[facadeModuleId.length - 2] || '[name]';
            return `js/${fileName}/[name].[hash].js`;
          }
        },
      }
    }
  };
});
