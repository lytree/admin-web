<template>
  <div class="h-full grid grid-cols-6 gap-4">
    <n-dialog-provider>
      <div class="col-span-2">
        <n-card class="min-h-560px" title="添加分类">
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
                placeholder="选择空为根节点"
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
          </n-form>
        </n-card>
      </div>
      <div class="col-span-4">
        <n-card class="min-h-560px" title="分类列表">
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
        <n-form ref="updateRef" :model="updateCategory">
          <n-form-item label="名称">
            <n-input v-model:value="updateCategory.slugName"></n-input>
          </n-form-item>
          <n-form-item label="别名">
            <n-input v-model:value="updateCategory.slug"></n-input>
          </n-form-item>
          <n-form-item label="上级分类">
            <n-tree-select
              v-model:value="updateCategory.parentId"
              children-field="children"
              key-field="id"
              label-field="slugName"
              clearable
              placeholder="选择节点"
              :options="options"
            />
          </n-form-item>
          <n-form-item label="封面">
            <icon-select v-model:value="updateCategory.thumbnail" />
          </n-form-item>
          <n-form-item label="优先级">
            <n-input-number v-model:value="updateCategory.priority" class="w-full" />
          </n-form-item>
          <div style="display: flex; justify-content: flex-end">
            <n-button round type="primary" @click="updateCategoryies"> 更新分类 </n-button>
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
import { type Category, save, treeView, deleteCategory as deleteApi } from '@/service/api/category';
import AntDesignBarsOutlined from '~icons/ant-design/bars-outlined';

const dialog = useDialog();
const saveRef = ref<FormInst | null>(null);
const updateRef = ref<FormInst | null>(null);
const message = useMessage();
const options = ref<Category[]>([
  { id: '0', slugName: '根节点', slug: '', parentId: '', thumbnail: '', priority: 0, description: '', children: [] }
]);
const saveCategory = ref<Category>({
  id: '',
  slugName: '',
  slug: '',
  parentId: '',
  priority: 0,
  thumbnail: '',
  description: ''
});
const updateCategory = ref<Category>({
  id: '',
  slugName: '',
  slug: '',
  parentId: '',
  priority: 0,
  thumbnail: '',
  description: ''
});
const showModal = ref<boolean>(false);

onMounted(async () => {
  const { data } = await treeView();
  if (data) {
    options.value[0].children = data;
  }
});

const data = ref([]);

function saveCategories() {
  saveRef.value?.validate(errors => {
    if (!errors) {
      save(saveCategory.value).then(req => {
        if (req.data) {
          options.value[0].children = req.data;
          saveCategory.value = {
            id: '',
            slugName: '',
            slug: '',
            parentId: '',
            priority: 0,
            thumbnail: '',
            description: ''
          };
        }
      });
    } else {
      message.error('验证失败');
    }
  });
}
function updateCategoryies() {
  updateRef.value?.validate(errors => {
    if (!errors) {
      save(updateCategory.value).then(req => {
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
                  updateCategory.value = {
                    id: option.id as string,
                    slugName: option.slugName as string,
                    slug: option.slug as string,
                    parentId: option.parentId as string,
                    thumbnail: option.thumbnail as string,
                    priority: option.priority as number,
                    description: option.description as string
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
</script>

<style scoped></style>
