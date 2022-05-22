<template>
  <main :style="style" class="grow w-full box-border duration-300 ease-in-out">
    <slot></slot>
  </main>
</template>

<script setup lang="ts">
import { computed } from 'vue-demi';

interface Props {
  /** 顶部内边距 */
  paddingTop?: number;
  /** 底部内边距 */
  paddingBottom?: number;
  /** 左侧内边距 */
  paddingLeft?: number;
  /** 是否禁止溢出 */
  overflowHidden?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  paddingTop: 0,
  paddingBottom: 0,
  paddingLeft: 0
});

const style = computed(() => {
  const { paddingTop, paddingBottom, paddingLeft } = props;
  const overflowStyle = `overflow: ${props.overflowHidden ? 'hidden' : 'visible'};`;
  return `padding-top: ${paddingTop}px;padding-bottom: ${paddingBottom}px;padding-left: ${paddingLeft}px;${overflowStyle}`;
});
</script>
<style></style>
