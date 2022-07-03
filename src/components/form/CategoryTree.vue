<template>
  <n-space vertical>
    <n-tree
      v-model:checked-keys="checkedKeys"
      block-line
      :data="categoryData"
      children-field="children"
      key-field="id"
      label-field="slugName"
      checkable
      expand-on-click
      selectable
    />
    <n-button @click="addCategoryModal = true">新增</n-button>
  </n-space>
  <n-modal v-model:show="addCategoryModal" preset="card" class="w-600px">
    <n-form ref="saveRef" :model="saveCategory">
      <n-form-item label="名称">
        <n-input v-model:value="saveCategory.slugName"></n-input>
      </n-form-item>
      <n-form-item label="别名">
        <n-input v-model:value="saveCategory.slug"></n-input>
      </n-form-item>
      <n-form-item label="上级分类">
        <n-tree-select
          v-model:value="saveCategory.parentId"
          children-field="children"
          key-field="id"
          label-field="slugName"
          clearable
          placeholder="选择节点"
          :options="options"
        />
      </n-form-item>
      <n-form-item label="封面">
        <icon-select v-model:value="saveCategory.thumbnail" />
      </n-form-item>
      <n-form-item label="优先级">
        <n-input-number v-model:value="saveCategory.priority" class="w-full" />
      </n-form-item>
      <div style="display: flex; justify-content: flex-end">
        <n-button round type="primary" @click="saveCategories"> 保存 </n-button>
      </div>
    </n-form></n-modal
  >
</template>
<script setup lang="ts">
import { FormInst, useMessage } from 'naive-ui';
import { list, save, treeView, type Category } from '@/service/api/category';

const message = useMessage();

interface Props {
  checkedKey: Array<number | string>;
}
interface Emits {
  (e: 'update:checkedKey', val: Array<number | string>): void;
}
const emit = defineEmits<Emits>();
const props = withDefaults(defineProps<Props>(), {
  checkedKey: () => {
    return [];
  }
});
const checkedKeys = computed({
  get() {
    return props.checkedKey;
  },
  set(val: Array<number | string>) {
    emit('update:checkedKey', val);
  }
});
const categoryData = ref<Category[]>([]);

const addCategoryModal = ref(false);
const saveCategory = ref<Category>({
  id: '',
  slugName: '',
  slug: '',
  parentId: '',
  priority: 0,
  thumbnail: '',
  description: ''
});
const options = ref<Category[]>([
  { id: '0', slugName: '根节点', slug: '', parentId: '', thumbnail: '', priority: 0, description: '', children: [] }
]);
const saveRef = ref<FormInst | null>(null);
function saveCategories() {
  saveRef.value?.validate(errors => {
    if (!errors) {
      save(saveCategory.value).then(req => {
        if (req.data) {
          options.value[0].children = req.data;
        }
      });
    } else {
      message.error('验证失败');
    }
  });
}
onMounted(async () => {
  const { data } = await treeView();
  if (data) {
    options.value[0].children = data;
  }
});
onMounted(async () => {
  const { data } = await list();
  if (data) {
    categoryData.value = data;
  }
});
</script>
<style></style>
