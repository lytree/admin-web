<template>
  <div class="h-full grid grid-cols-6 gap-4">
    <n-dialog-provider>
      <div class="col-span-2">
        <n-card class="min-h-560px" title="添加目录">
          <n-form ref="saveRef" :model="saveMenu">
            <n-form-item label="名称">
              <n-input v-model:value="saveMenu.slugName"></n-input>
            </n-form-item>
            <n-form-item label="别名">
              <n-input v-model:value="saveMenu.slug"></n-input>
            </n-form-item>
            <n-form-item label="上级目录">
              <n-tree-select
                v-model:value="saveMenu.parentId"
                children-field="children"
                key-field="id"
                label-field="slugName"
                clearable
                placeholder="选择空为根节点"
                :options="options"
              />
            </n-form-item>
            <n-form-item label="图标">
              <icon-select v-model:value="saveMenu.icon" />
            </n-form-item>
            <n-form-item label="跳转方式">
              <n-select v-model:value="saveMenu.target" :options="targetSelect"></n-select>
            </n-form-item>
            <n-form-item label="优先级">
              <n-input-number v-model:value="saveMenu.priority" class="w-full" />
            </n-form-item>
            <div style="display: flex; justify-content: flex-end">
              <n-button round type="primary" @click="saveMenus"> 保存 </n-button>
            </div>
          </n-form>
        </n-card>
      </div>
      <div class="col-span-4">
        <n-card class="min-h-560px" title="目录列表">
          <n-tree
            block-line
            draggable
            :data="options[0].children"
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
      <n-modal v-model:show="showModal" class="w-600px" preset="card" title="更新目录">
        <n-form ref="updateRef" :model="updateMenu">
          <n-form-item label="名称">
            <n-input v-model:value="updateMenu.slugName"></n-input>
          </n-form-item>
          <n-form-item label="别名">
            <n-input v-model:value="updateMenu.slug"></n-input>
          </n-form-item>
          <n-form-item label="上级目录">
            <n-tree-select
              v-model:value="updateMenu.parentId"
              children-field="children"
              key-field="id"
              label-field="slugName"
              clearable
              placeholder="选择空为根节点"
              :options="options"
            />
          </n-form-item>
          <n-form-item label="图标">
            <icon-select v-model:value="updateMenu.icon" />
          </n-form-item>
          <n-form-item label="跳转方式">
            <n-select v-model:value="updateMenu.target" :options="targetSelect"></n-select>
          </n-form-item>
          <n-form-item label="优先级">
            <n-input-number v-model:value="updateMenu.priority" class="w-full" />
          </n-form-item>
          <div style="display: flex; justify-content: flex-end">
            <n-button round type="primary" @click="updateMenus"> 更新目录 </n-button>
          </div>
        </n-form>
      </n-modal></n-dialog-provider
    >
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
  useDialog
} from 'naive-ui';
import { type Menu, save, treeView, deleteMenu as deleteApi } from '@/service/api/menu';
import AntDesignBarsOutlined from '~icons/ant-design/bars-outlined';

const dialog = useDialog();
const saveRef = ref<FormInst | null>(null);
const updateRef = ref<FormInst | null>(null);
const message = useMessage();
const options = ref<Menu[]>([
  { id: '0', slugName: '根节点', slug: '', parentId: '', icon: '', target: '', priority: 0, children: [] }
]);
const saveMenu = ref<Menu>({ id: '', slugName: '', slug: '', parentId: '', priority: 0, icon: '', target: '' });
const updateMenu = ref<Menu>({ id: '', slugName: '', slug: '', parentId: '', priority: 0, icon: '', target: '' });
const showModal = ref<boolean>(false);

onMounted(async () => {
  const { data } = await treeView();
  if (data) {
    options.value[0].children = data;
  }
});

const data = ref([]);

function saveMenus() {
  saveRef.value?.validate(errors => {
    if (!errors) {
      save(saveMenu.value).then(req => {
        if (req.data) {
          options.value[0].children = req.data;
        }
      });
    } else {
      message.error('验证失败');
    }
  });
}
function updateMenus() {
  updateRef.value?.validate(errors => {
    if (!errors) {
      save(updateMenu.value).then(req => {
        if (req.data) {
          message.info('修改成功');
          showModal.value = false;
          options.value[0].children = req.data;
        }
      });
    } else {
      message.error('验证失败');
    }
  });
}
function deleteMenu(id: string) {
  dialog.warning({
    title: '警告',
    content: '是否删除',
    positiveText: '确定',
    negativeText: '取消',
    onPositiveClick: () => {
      deleteApi(id).then(req => {
        if (req.data) {
          options.value[0].children = req.data;
          message.info('删除成功');
        }
      });
    },
    onNegativeClick: () => {
      message.info('取消删除');
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
            { title: `${option.slugName}`, class: 'px-0 py-0' },
            {
              avatar: () => h(AntDesignBarsOutlined),
              default: () => h('div', { class: 'mt-0' }, `${option.slug}`)
            }
          ),
        suffix: () =>
          h(NSpace, { class: 'w-72px' }, () => [
            h(
              NButton,
              {
                text: true,
                type: 'primary',
                onClick: () => {
                  showModal.value = true;
                  updateMenu.value = {
                    id: option.id as string,
                    slugName: option.slugName as string,
                    slug: option.slug as string,
                    parentId: option.parentId as string,
                    icon: option.icon as string,
                    priority: option.priority as number,
                    target: option.target as string
                  };
                }
              },
              { default: () => `修改` }
            ),
            h(
              NButton,
              { text: true, type: 'primary', onClick: () => deleteMenu(option.id as string) },
              { default: () => `删除` }
            )
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

const targetSelect = [
  {
    label: 'blank',
    value: '_blank'
  },
  {
    label: 'self',
    value: '_self'
  },
  {
    label: 'parent',
    value: '_parent'
  },
  {
    label: 'top',
    value: '_top'
  }
];
</script>

<style scoped>
:deep(.n-thing .n-thing-main .n-thing-main__content:not(:first-child)) {
  margin-top: 0px;
}
</style>
