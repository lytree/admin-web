<template>
  <aside class="fixed left-0 top-0 box-border h-full transition-all z-[1002]" :style="style">
    <slot></slot>
  </aside>
</template>

<script setup lang="ts">
import { computed } from 'vue-demi';

interface Props {
  /** 宽度 */
  width?: number;
  /** 顶部内边距 */
  paddingTop?: number;
}

const props = withDefaults(defineProps<Props>(), {
  zIndex: 1002,
  width: 200,
  paddingTop: 0
});

const style = computed(() => {
  const { width, paddingTop } = props;
  return `width: ${width}px;padding-top: ${paddingTop}px;`;
});
</script>
<style></style>
