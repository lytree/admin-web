<template>
  <n-space :vertical="true" :size="16">
    <n-card>
      <n-tabs
        default-value="general"
        size="large"
        type="card"
        animated
        tab-style="border-top-left-radius: 10px;border-top-right-radius: 10px"
        style="margin: 0 -4px"
        pane-style="padding-left: 4px; padding-right: 4px; box-sizing: border-box;width:560px"
      >
        <n-tab-pane name="general" tab="常规设置">
          <general-tab></general-tab>
        </n-tab-pane>
        <n-tab-pane name="seo" tab="SEO设置">
          <seo-tab></seo-tab>
        </n-tab-pane>
        <n-tab-pane name="comment" tab="SMTP设置"> <smtp-tab></smtp-tab></n-tab-pane>
        <n-tab-pane name="post" tab="文章设置"> <post-tab></post-tab></n-tab-pane>
        <n-tab-pane name="other" tab="其他设置"> <other-tab></other-tab></n-tab-pane> </n-tabs
    ></n-card>
  </n-space>
</template>

<script setup lang="ts">
import { GeneralTab } from './components';
import SeoTab from './components/SeoTab.vue';
import PostTab from './components/PostTab.vue';
import OtherTab from './components/OtherTab.vue';
import SmtpTab from './components/SMTPTab.vue';
</script>
<style scoped></style>
