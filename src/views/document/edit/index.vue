<template>
  <div class="h-full">
    <n-card title="新文章" class="shadow-sm rounded-16px">
      <template #header-extra>
        <n-space
          ><n-button> 预览 </n-button> <n-button type="primary" @click="publicVisible = true"> 发布 </n-button></n-space
        >
      </template>
      <div class="py-4">
        <n-input size="large" placeholder="请输入文章标题"></n-input>
      </div>
      <div ref="domRef"></div>
    </n-card>
    <publish-post-modal v-model:visible="publicVisible"></publish-post-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue';
import Vditor from 'vditor';
import 'vditor/dist/index.css';
import { useThemeStore } from '@/store';
import PublishPostModal from './component/PublishPostModal/index.vue';

const theme = useThemeStore();
const publicVisible = ref<boolean>(false);
const vditor = ref<Vditor>();
const domRef = ref<HTMLElement>();

function renderVditor() {
  if (!domRef.value) return;
  vditor.value = new Vditor(domRef.value, {
    minHeight: 520,
    theme: theme.darkMode ? 'dark' : 'classic',
    icon: 'material',
    cache: { enable: false }
  });
}

const stopHandle = watch(
  () => theme.darkMode,
  newValue => {
    const themeMode = newValue ? 'dark' : 'classic';
    vditor.value?.setTheme(themeMode);
  }
);

onMounted(() => {
  renderVditor();
});

onUnmounted(() => {
  stopHandle();
});
</script>
<style scoped></style>
