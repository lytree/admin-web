import AutoImport from 'unplugin-auto-import/vite';

export default [
  AutoImport({
    include: [
      /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
      /\.vue\??/ // .vue
    ],
    imports: ['vue', 'vue-router', '@vueuse/core']
  })
];
