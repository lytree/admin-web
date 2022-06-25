/** vue 的defineExpose导出的类型 */
declare namespace Expose {
  interface BetterScroll {
    instance: import('@better-scroll/core').BScrollInstance;
  }
}

declare module '*.vue' {
  import { type DefineComponent } from 'vue';

  // eslint-disable-next-line @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>;
  export default component;
}
