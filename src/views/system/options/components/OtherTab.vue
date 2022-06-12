<template>
  <n-form ref="formRef" :model="optionsGroup">
    <component
      :is="component[item.optionComponent]"
      v-for="(item, index) in optionsGroup.optionList"
      :key="index"
      v-model:value="item.optionValue"
      :name="item.optionName"
      path="value"
      :desc="item.optionDesc"
    ></component>
  </n-form>
  <n-button type="primary" block secondary strong> 保存 </n-button>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { FormInst } from 'naive-ui';
import { component } from '@/components';
import { fetchSystemConfig } from '@/service/api/system';
import type { OptionsGroup } from '@/service/api/system';

const optionsGroup = ref<OptionsGroup>({
  id: '',
  groupName: '',
  groupKey: '',
  optionList: [
    { id: '', optionName: '', optionComponent: '', optionKey: '', optionValue: '', optionLevel: '', status: 1 }
  ]
});
const formRef = ref<FormInst | null>(null);
onMounted(async () => {
  const { data } = await fetchSystemConfig('global_other_settings');
  if (data) {
    optionsGroup.value = data;
  }
  return null;
});
</script>
