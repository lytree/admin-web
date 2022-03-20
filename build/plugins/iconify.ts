import Icons from 'unplugin-icons/vite'; // iconify图标
import IconsResolver from 'unplugin-icons/resolver';
import Components from 'unplugin-vue-components/vite'; // 从指定目录自动导入组件

export default [
  Components({
    // allow auto load markdown components under `./src/components/`
    extensions: ['vue', 'md'],

    // allow auto import and register components used in markdown
    include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
    resolvers: [IconsResolver({ componentPrefix: 'icon' })]
  }),
  Icons({ scale: 1, defaultClass: 'inline-block', compiler: 'vue3' })
];
