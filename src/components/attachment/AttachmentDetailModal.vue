<template>
  <n-modal v-model:show="dialogShow" :bordered="false" preset="card" class="w-[1024px]" :mask-closable="true">
    <div class="grid grid-cols-2 gap-4">
      <div class=""><n-image :src="props.attachment?.url"></n-image></div>
      <div class=""><n-form></n-form></div></div
  ></n-modal>
</template>
<script lang="ts" setup>
import { type AttachmentsDetail } from '@/service/api/attachments';

interface Props {
  visible: boolean;
  attachment: AttachmentsDetail | null;
}
interface Emits {
  (e: 'update:visible', value: boolean): void;
}
const dialogShow = computed({
  get: () => props.visible,
  set: val => emit('update:visible', val)
});
const emit = defineEmits<Emits>();

const props = withDefaults(defineProps<Props>(), {
  visible: false,
  attachment: null
});
</script>
