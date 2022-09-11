<template>
  <div class="h-360px">
    <n-timeline>
      <n-timeline-item v-for="item in timelines" :key="item.type" v-bind="item" />
    </n-timeline>
  </div>
</template>

<script setup lang="ts">

interface TimelineData {
  type: 'default' | 'info' | 'success' | 'warning' | 'error';
  title: string;
  content: string;
  time: string;
}


const timelines: TimelineData[] = [
  { type: 'default', title: '啊', content: '', time: '2021-10-10 20:46' },
  { type: 'success', title: '成功', content: '哪里成功', time: '2021-10-10 20:46' },
  { type: 'error', title: '错误', content: '哪里错误', time: '2021-10-10 20:46' },
  { type: 'warning', title: '警告', content: '哪里警告', time: '2021-10-10 20:46' },
  { type: 'info', title: '信息', content: '是的', time: '2021-10-10 20:46' }
];


</script>
<style scoped></style>
