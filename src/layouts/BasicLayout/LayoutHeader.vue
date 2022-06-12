<template>
  <header class="flex-shrink-0 w-full box-border duration-300 ease-in-out fixed z-[1001]" :style="style">
    <slot></slot>
  </header>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  /** 最小宽度 */
  minWidth?: number;
  /** 高度 */
  height?: number;
  /** 左侧内边距 */
  paddingLeft?: number;
}

const props = withDefaults(defineProps<Props>(), {
  minWidth: 1200,
  height: 56,
  paddingLeft: 0
});

const style = computed(() => {
  const { minWidth, height, paddingLeft } = props;
  return `min-width: ${minWidth}px;height: ${height}px;padding-left: ${paddingLeft}px;`;
});
</script>
<style></style>
