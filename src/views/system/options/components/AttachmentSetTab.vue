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
    <component
      :is="component[item.optionComponent]"
      v-for="(item, index) in optionsGroup1.optionList"
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
const optionsGroup1 = ref<OptionsGroup>({
  id: '',
  groupName: '',
  groupKey: '',
  optionList: [
    { id: '', optionName: '', optionComponent: '', optionKey: '', optionValue: '', optionLevel: '', status: 1 }
  ]
});
const formRef = ref<FormInst | null>(null);
onMounted(async () => {
  const { data } = await fetchSystemConfig('global_upload_settings');
  if (data) {
    optionsGroup.value = data;
    getDetail(data.optionList[0].optionValue);
  }
  return null;
});
watch(
  () => optionsGroup.value.optionList[0].optionValue,
  (newValue, _oldValue) => {
    getDetail(newValue);
  }
);
function getDetail(key: string) {
  fetchSystemConfig(key).then(req => {
    if (req.data) {
      optionsGroup1.value = req.data;
    }
  });
}

function save() {
  console.log(optionsGroup.value);
}
</script>
