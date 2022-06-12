<template>
  <div class="flex-shrink-0 w-full box-border duration-300 ease-in-out z-[999] fixed" :style="style">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  /** fixed布局的top距离 */
  top?: number;
  /** 最小宽度 */
  minWidth?: number;
  /** 高度 */
  height?: number;
  /** 左侧内边距 */
  paddingLeft?: number;
}

const props = withDefaults(defineProps<Props>(), {
  top: 56,
  minWidth: 1200,
  height: 56,
  paddingLeft: 0
});

const style = computed(() => {
  const { top, minWidth, height, paddingLeft } = props;
  return `top: ${top}px;min-width: ${minWidth}px;height: ${height}px;padding-left: ${paddingLeft}px;`;
});
</script>
<style></style>
