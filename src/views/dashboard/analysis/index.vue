<template>
  <div class="grid gap-3">
    <div class="grid grid-cols-3 content-start gap-3">
      <n-card class="min-h-[240px]" title="文章" size="huge"></n-card>
      <n-card class="min-h-[240px]" title="评论" size="huge"></n-card>
      <n-card class="min-h-[240px]" title="阅读量" size="huge"></n-card>
    </div>
    <div class="grid grid-cols-2 content-start gap-3">
      <n-card class="min-h-[240px]" title="新动态" size="huge">
        <n-tabs type="line" animated>
          <n-tab-pane name="最近文章" tab="最近文章"> 最近文章</n-tab-pane>
          <n-tab-pane name="最近评论" tab="最近评论">最近评论 </n-tab-pane>
        </n-tabs>
      </n-card>
      <n-card class="min-h-[240px]" title="时间线" size="huge"> <bottom-part /></n-card>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { BottomPart } from './components';
</script>
<style scoped></style>
