<template>
  <n-form ref="formRef" :model="optionsGroup">
    <component
      :is="component[item.optionComponent]"
      v-for="(item, index) in optionsGroup.optionList"
      :key="index"
      v-model:value="item.optionValue"
      :name="item.optionName"
      path="value"
       :content="item.optionContent"
    ></component>
  </n-form>
  <n-button type="primary" block secondary strong @click="save"> 保存 </n-button>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { FormInst } from 'naive-ui';
import { component } from '@/components';
import { fetchSystemConfig, saveSystemConfigs, type OptionsGroup } from '@/service/api/system';

const formRef = ref<FormInst | null>(null);
const optionsGroup = ref<OptionsGroup>({
  id: '',
  groupName: '',
  groupKey: '',
  optionList: [
    { id: '', optionName: '', optionComponent: '', optionKey: '', optionValue: '', optionLevel: '', status: 1 }
  ]
});

onMounted(async () => {
  const { data } = await fetchSystemConfig('global_system_settings');
  if (data) {
    optionsGroup.value = data;
  }
  return null;
});

function save() {
  console.log(optionsGroup.value);
  saveSystemConfigs(optionsGroup.value.optionList);
}
</script>
