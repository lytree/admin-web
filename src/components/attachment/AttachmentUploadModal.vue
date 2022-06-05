<template>
  <n-modal
    v-model:show="modelVisible"
    :bordered="false"
    preset="card"
    class="w-[500px]"
    :mask-closable="true"
    :title="title"
  >
    <FilePondUpload ref="upload" :upload-handler="uploadHandler"></FilePondUpload>
  </n-modal>
</template>
<script lang="ts" setup>
import { computed } from 'vue';

interface Props {
  visible: boolean;
  title?: string;
}
interface Emits {
  (e: 'update:visible', value: boolean): void;
}
const props = withDefaults(defineProps<Props>(), {
  visible: false,
  title: '上传附件'
});

const emit = defineEmits<Emits>();

const modelVisible = computed({
  get: () => props.visible,
  set: val => emit('update:visible', val)
});
function uploadHandler(file: any, options: any) {
  return null;
}
</script>
