<template>
  <div class="h-full grid grid-cols-6 gap-4">
    <div class="col-span-2">
      <n-card class="min-h-560px" title="添加目录">
        <n-form ref="formRef" :model="menu">
          <n-form-item label="名称">
            <n-input v-model:value="menu.slugName"></n-input>
          </n-form-item>
          <n-form-item label="别名">
            <n-input v-model:value="menu.slug"></n-input>
          </n-form-item>
          <n-form-item label="上级目录">
            <n-tree-select
              v-model:value="menu.parentId"
              children-field="children"
              key-field="id"
              label-field="slugName"
              clearable
              placeholder="选择空为根节点"
              :options="options"
            />
          </n-form-item>
          <n-form-item label="图标">
            <n-input v-model:value="menu.icon"></n-input>
          </n-form-item>
          <n-form-item label="描述">
            <n-input v-model:value="menu.description" type="textarea"></n-input>
          </n-form-item>
          <div style="display: flex; justify-content: flex-end">
            <n-button round type="primary" @click="saveCategory"> 保存 </n-button>
          </div>
        </n-form>
      </n-card>
    </div>
    <div class="col-span-4">
      <n-card class="min-h-560px" title="目录列表">
        <n-tree
          block-line
          draggable
          :data="options"
          children-field="children"
          key-field="id"
          label-field="slugName"
          clearable
          default-expand-all
          :render-label="renderLabel"
          :selectable="false"
          @drop="handleDrop"
      /></n-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { h, onMounted, ref } from 'vue';
import {
  FormInst,
  useMessage,
  NButton,
  NSpace,
  TreeOption,
  TreeDropInfo,
  NList,
  NListItem,
  NThing,
  NAvatar
} from 'naive-ui';
import { type Menu, save, treeView } from '@/service/api/menu';
import AntDesignBarsOutlined from '~icons/ant-design/bars-outlined';

const formRef = ref<FormInst | null>(null);
const message = useMessage();
const options = ref<Menu[]>([]);
const menu = ref<Menu>({ id: '', slugName: '', slug: '', parentId: '', icon: '', description: '' });
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
      save(menu.value).then(req => {
        if (req.data) {
          options.value = req.data;
        }
      });
    } else {
      message.error('验证失败');
    }
  });
}

function renderLabel({ option }: { option: TreeOption }) {
  return h(NList, { bordered: true }, () =>
    h(
      NListItem,
      { class: 'px-1' },
      {
        default: () =>
          h(
            NThing,
            { title: `${option.slugName}` },
            {
              avatar: () => h(AntDesignBarsOutlined),
              default: () => `${option.slug}`
            }
          ),
        suffix: () =>
          h(NSpace, { class: 'w-72px' }, () => [
            h(NButton, { text: true, type: 'primary' }, { default: () => `修改` }),
            h(NButton, { text: true, type: 'primary' }, { default: () => `删除` })
          ])
      }
    )
  );
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
  console.log(node, dragNode, dropPosition);
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
