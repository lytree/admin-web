<template>
  <n-space :vertical="true" :size="16">
    <n-card>
      <n-tabs
        default-value="signin"
        size="large"
        type="card"
        animated
        tab-style="border-top-left-radius: 10px;border-top-right-radius: 10px"
        style="margin: 0 -4px"
        pane-style="padding-left: 4px; padding-right: 4px; box-sizing: border-box;width:560px"
      >
        <n-tab-pane name="signin" tab="常规设置">
          <general-tab></general-tab>
          
        </n-tab-pane>
        <n-tab-pane name="signup" tab="文章设置">
          <n-button type="primary" block secondary strong> 注册 </n-button>
        </n-tab-pane>
        <n-tab-pane name="other" tab="其他设置">
          <n-button type="primary" block secondary strong> 注册 </n-button>
        </n-tab-pane>
      </n-tabs></n-card
    >
  </n-space>
</template>

<script setup lang="ts">
import { GeneralTab } from './components';
</script>
<style scoped></style>
