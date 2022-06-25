<template>
  <n-space vertical>
    <n-tree block-line :data="categoryData" :checked-keys="checkedKeys" checkable expand-on-click selectable />
    <n-button>新增</n-button>
  </n-space>
</template>
<script setup lang="ts">
import { list, type Category } from '@/service/api/category';

interface Props {
  checkedKeys: Array<number | string>;
}
interface Emits {
  (e: 'update:checkedKeys', val: Array<number | string>): void;
}
const emit = defineEmits<Emits>();
const props = withDefaults(defineProps<Props>(), {
  checkedKeys: () => []
});
const checkedKeys = computed({
  get() {
    return props.checkedKeys;
  },
  set(val: Array<number | string>) {
    emit('update:checkedKeys', val);
  }
});
const categoryData = ref<Category[]>([]);

onMounted(async () => {
  const { data } = await list();
  if (data) {
    categoryData.value = data;
  }
});
</script>
<style></style>
