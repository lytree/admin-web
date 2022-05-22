<template>
  <div class="flex flex-col w-full h-full" :style="{ minWidth: theme.layout.minWidth + 'px' }">
    <layout-header :min-width="theme.layout.minWidth" :height="theme.header.height" :padding-left="currentSiderWidth">
      <global-header v-bind="headerProps"></global-header>
    </layout-header>
    <layout-tab
      :min-width="theme.layout.minWidth"
      :top="theme.header.height"
      :height="theme.tab.height"
      :padding-left="currentSiderWidth"
    >
      <global-tab></global-tab>
    </layout-tab>
    <layout-sider :width="currentSiderWidth">
      <global-sider></global-sider>
    </layout-sider>
    <layout-content
      :padding-top="contentPaddingTop"
      :padding-bottom="contentPaddingBottom"
      :padding-left="currentSiderWidth"
      :overflow-hidden="addMainOverflowHidden"
    >
      <global-content @hide-main-overflow="setAddMainOverflowHidden"></global-content>
    </layout-content>
    <layout-footer
      :fixed="theme.footer.fixed"
      :min-width="theme.layout.minWidth"
      :height="theme.footer.height"
      :padding-left="currentSiderWidth"
    >
      <global-footer></global-footer>
    </layout-footer>
  </div>
  <setting-drawer />
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useAppStore, useThemeStore } from '@/store';
import { useBasicLayout } from '@/composables';
import { useBoolean } from '@/hooks';
import { SettingDrawer, GlobalHeader, GlobalTab, GlobalSider, GlobalContent, GlobalFooter } from '../common';
import LayoutContent from './LayoutContent.vue';
import LayoutFooter from './LayoutFooter.vue';
import LayoutSider from './LayoutSider.vue';
import LayoutTab from './LayoutTab.vue';
import LayoutHeader from './LayoutHeader.vue';

const app = useAppStore();
const theme = useThemeStore();

const { headerProps, siderVisible, siderWidth, siderCollapsedWidth } = useBasicLayout();

const { bool: addMainOverflowHidden, setBool: setAddMainOverflowHidden } = useBoolean();

/** 侧边宽度 */
const currentSiderWidth = computed(() => {
  const width = app.siderCollapse ? siderCollapsedWidth : siderWidth;
  return siderVisible.value ? width.value : 0;
});
const contentPaddingTop = computed(() => {
  let height = 0;
  height += theme.header.height;
  height += theme.tab.height;
  return height;
});
const contentPaddingBottom = computed(() => (theme.footer.fixed ? theme.footer.height : 0));
</script>
<style scoped></style>
