<template>
  <n-select
    v-model="selectedTagId"
    :options="options"
    label-field="slugName"
    value-field="id"
    multiple
    class="w-full"
    placeholder="选择或输入标签"
  >
  </n-select>
</template>
<script setup lang="ts">
import { list, Tag } from '@/service/api/tag';

interface Props {
  tagIds: string[];
}
interface Emits {
  (e: 'update:tagIds', val: string[]): void;
}
const emit = defineEmits<Emits>();
const props = withDefaults(defineProps<Props>(), {
  tagIds: () => []
});
const selectedTagId = computed({
  get() {
    return props.tagIds;
  },
  set(val: string[]) {
    emit('update:tagIds', val);
  }
});
const options = ref<Tag[]>([]);
onMounted(async () => {
  const { data } = await list();
  if (data) {
    options.value = data;
  }
});
</script>
<style></style>
