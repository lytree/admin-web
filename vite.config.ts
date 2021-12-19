import path, { join } from 'path'
import { ConfigEnv, UserConfigExport } from 'vite'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Vue from '@vitejs/plugin-vue'
import dotenv from 'dotenv';
import WindiCSS from 'vite-plugin-windicss'



import { minifyHtml, injectHtml } from 'vite-plugin-html'; // html插件(使用变量、压缩)
const markdownWrapperClasses = 'prose prose-sm m-auto text-left'
const { parsed: viteEnv } = dotenv.config(); // 加载环境
export default ({ command, mode }: ConfigEnv): UserConfigExport => {
  return {
    resolve: {
      alias: {
        '@/': `${path.resolve(__dirname, 'src')}/`
      }
    },
    plugins: [
      WindiCSS(),
      Vue({
        include: [/\.vue$/, /\.md$/]
      }),
      // https://github.com/antfu/unplugin-auto-import
      AutoImport({
        include: [
          /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
          /\.vue\??/ // .vue
        ],
        imports: ['vue', 'vue-router', '@vueuse/core'],
        dts: 'src/vue-auto-imports.d.ts'
      }),

      // https://github.com/antfu/unplugin-vue-components
      Components({
        // allow auto load markdown components under `./src/components/`
        extensions: ['vue', 'md'],

        // allow auto import and register components used in markdown
        include: [/\.vue$/, /\.vue\?vue/, /\.md$/],

        // custom resolvers
        resolvers: [
          // auto import icons
          // https://github.com/antfu/unplugin-icons
          IconsResolver({
            componentPrefix: ''
            // enabledCollections: ['carbon']
          })
        ],

        dts: 'src/vue-components.d.ts'
      }),
      // css: {
      //   //css预处理
      //   preprocessorOptions: {
      //     scss: {
      //       /*
      //       引入var.scss全局预定义变量，
      //       如果引入多个文件，
      //       可以使用
      //       '@import "@/assets/scss/globalVariable1.scss";@import "@/assets/scss/globalVariable2.scss";'
      //       这种格式
      //        */
      //       // additionalData: '@import "@/assets/scss/globalVariable.scss";'
      //     }
      //   }
      // },
      // https://github.com/antfu/unplugin-icons
      Icons({
        autoInstall: true
      }),
      minifyHtml(),
      injectHtml({
        injectData: {
          appName: viteEnv.VITE_APP_NAME,
          appTitle: viteEnv.VITE_APP_TITLE
        }
      })
    ],
    // css: {
    //   //css预处理
    //   preprocessorOptions: {
    //     scss: {
    //       /*
    //       引入var.scss全局预定义变量，
    //       如果引入多个文件，
    //       可以使用
    //       '@import "@/assets/scss/globalVariable1.scss";@import "@/assets/scss/globalVariable2.scss";'
    //       这种格式
    //        */
    //       // additionalData: '@import "@/assets/scss/globalVariable.scss";'
    //     }
    //   }
    // },
    server: {
      fs: {
        strict: true
      }
    },
    optimizeDeps: {
      include: ['vue', 'vue-router', '@vueuse/core'],
      exclude: []
    }
  }
}
