<template>
  <footer class="z-[999] box-border w-full left-0 bottom-0 duration-300 ease-in-out flex-shrink-0" :style="style">
    <slot></slot>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  /** 开启fixed布局 */
  fixed?: boolean;
  /** 最小宽度 */
  minWidth?: number;
  /** 高度 */
  height?: number;
  /** 左侧内边距 */
  paddingLeft?: number;
}

const props = withDefaults(defineProps<Props>(), {
  fixed: true,
  minWidth: 1200,
  height: 56,
  paddingLeft: 0
});

const style = computed(() => {
  const { fixed, minWidth, height, paddingLeft } = props;
  const position = fixed ? 'fixed' : 'static';
  return `position: ${position};min-width: ${minWidth}px;height: ${height}px;padding-left: ${paddingLeft}px;`;
});
</script>
<style></style>
