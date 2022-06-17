<template>
  <div class="h-full grid grid-cols-6 gap-4">
    <div class="col-span-2">
      <n-card class="min-h-560px" title="添加分类">
        <n-form ref="formRef" :model="category">
          <n-form-item label="名称">
            <n-input v-model:value="category.slugName"></n-input>
          </n-form-item>
          <n-form-item label="别名">
            <n-input v-model:value="category.slug"></n-input>
          </n-form-item>
          <n-form-item label="上级分类">
            <n-tree-select
              v-model:value="category.parentId"
              children-field="children"
              key-field="id"
              label-field="slugName"
              clearable
              placeholder="选择空为根节点"
              :options="options"
            />
          </n-form-item>
          <n-form-item label="封面图">
            <n-input v-model:value="category.thumbnail"></n-input>
          </n-form-item>
          <n-form-item label="描述">
            <n-input v-model:value="category.description" type="textarea"></n-input>
          </n-form-item>
          <div style="display: flex; justify-content: flex-end">
            <n-button round type="primary" @click="saveCategory"> 保存 </n-button>
          </div>
        </n-form>
      </n-card>
    </div>
    <div class="col-span-4">
      <n-card class="min-h-560px" title="分类列表">
        <n-tree
          block-line
          draggable
          :data="options"
          children-field="children"
          key-field="id"
          label-field="slugName"
          clearable
          :render-suffix="renderSuffix"
          :selectable="false"
          @drop="handleDrop"
      /></n-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { h, onMounted, ref } from 'vue';
import { FormInst, useMessage, NButton, NSpace, TreeOption, TreeDropInfo } from 'naive-ui';
import { type Category, save, treeView } from '@/service/api/category';

const formRef = ref<FormInst | null>(null);
const message = useMessage();
const options = ref<Category[]>([]);
const category = ref<Category>({ id: '', slugName: '', slug: '', parentId: '', thumbnail: '', description: '' });
onMounted(async () => {
  const { data } = await treeView();
  if (data) {
    options.value = data;
  }
});

const data = ref([]);

function saveCategory() {
  formRef.value?.validate(errors => {
    if (!errors) {
      save(category.value).then(req => {
        if (req.data) {
          options.value = req.data;
        }
      });
    } else {
      console.log(errors);
      message.error('验证失败');
    }
  });
}
function renderSuffix({ option }: { option: TreeOption }) {
  console.log(option);
  return h(NSpace, () => [
    h(NButton, { text: true, type: 'primary' }, { default: () => `修改` }),
    h(NButton, { text: true, type: 'primary' }, { default: () => `删除` })
  ]);
}

function findSiblingsAndIndex(node: TreeOption, nodes?: TreeOption[]): [TreeOption[], number] | [null, null] {
  if (!nodes) return [null, null];

  for (let i = 0; i < nodes.length; i += 1) {
    const siblingNode = nodes[i];
    if (siblingNode.key === node.key) return [nodes, i];
    const [siblings, index] = findSiblingsAndIndex(node, siblingNode.children);
    if (siblings && index !== null) return [siblings, index];
  }
  return [null, null];
}
function handleDrop({ node, dragNode, dropPosition }: TreeDropInfo) {
  const [dragNodeSiblings, dragNodeIndex] = findSiblingsAndIndex(dragNode, data.value);
  if (dragNodeSiblings === null || dragNodeIndex === null) return;
  dragNodeSiblings.splice(dragNodeIndex, 1);
  if (dropPosition === 'inside') {
    if (node.children) {
      node.children.unshift(dragNode);
    } else {
      node.children = [dragNode];
    }
  } else if (dropPosition === 'before') {
    const [nodeSiblings, nodeIndex] = findSiblingsAndIndex(node, data.value);
    if (nodeSiblings === null || nodeIndex === null) return;
    nodeSiblings.splice(nodeIndex, 0, dragNode);
  } else if (dropPosition === 'after') {
    const [nodeSiblings, nodeIndex] = findSiblingsAndIndex(node, data.value);
    if (nodeSiblings === null || nodeIndex === null) return;
    nodeSiblings.splice(nodeIndex + 1, 0, dragNode);
  }
  data.value = Array.from(data.value);
}
</script>

<style scoped></style>
