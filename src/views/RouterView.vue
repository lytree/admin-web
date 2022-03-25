<script lang="ts">
import { defineComponent, ref } from 'vue';
import { darkTheme, NConfigProvider } from 'naive-ui';
import type { GlobalTheme } from 'naive-ui';

export default defineComponent({
  components: {
    NConfigProvider
  },
  setup() {
    return {
      darkTheme,
      theme: ref<GlobalTheme | null>(null)
    };
  }
});
</script>

<template>
  <n-config-provider class="h-full" :theme="theme">
    <router-view></router-view>
  </n-config-provider>
</template>

<style></style>
