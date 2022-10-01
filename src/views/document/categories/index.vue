<template>
  <div class="h-full grid grid-cols-6 gap-4">
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
            <n-input v-model:value="saveCategory.thumbnail" readonly placeholder="点击选择图片">
              <template #suffix>
                <n-button bordered @click="attachmentVisible = true">
                  <template #icon>
                    <ClarityPictureLine></ClarityPictureLine>
                  </template>
                </n-button>
              </template>
            </n-input>
          </n-form-item>
          <n-form-item label="优先级">
            <n-input-number v-model:value="saveCategory.priority" class="w-full" />
          </n-form-item>

          <div v-if="!isUpdate" style="display: flex; justify-content: flex-end">
            <n-button round type="primary" @click="saveCategories"> 保存 </n-button>
          </div>
          <div v-else style="display: flex; justify-content: flex-end; gap: 5px">
            <n-button round type="primary" @click="saveCategories"> 更新 </n-button
            ><n-button round @click="exitUpdate"> 退出更新 </n-button>
          </div>
        </n-form>
      </n-card>
    </div>
    <n-dialog-provider>
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
    </n-dialog-provider>
    <attachment-select-modal
      v-model:visible="attachmentVisible"
      @save-after="insertImg"
      :multi-select="false"
    ></attachment-select-modal>
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
import ClarityPictureLine from '~icons/clarity/picture-line';
import { AttachmentsDetail } from '@/service/api/attachments';
const attachmentVisible = ref<boolean>(false);
const dialog = useDialog();
const saveRef = ref<FormInst | null>(null);
const isUpdate = ref<Boolean>(false);
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
          if (isUpdate.value) {
            message.info('更新成功');
            isUpdate.value = false;
          } else {
            message.info('保存成功');
          }
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
function exitUpdate() {
  isUpdate.value = false;
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
          h(NSpace, { class: 'w-114px' }, () => [
            h(
              NButton,
              {
                text: true,
                type: 'primary',
                onClick: () => {
                  saveCategory.value.parentId = option.parentId as string;
                }
              },
              { default: () => `新增` }
            ),
            h(
              NButton,
              {
                text: true,
                type: 'primary',
                onClick: () => {
                  isUpdate.value = true;
                  saveCategory.value = {
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
function insertImg(selected: AttachmentsDetail[]) {
  saveCategory.value.thumbnail = selected[0].thumbnail;
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

<style lang="scss" scoped>
:deep(.n-input-wrapper) {
  padding-right: 0;
}
</style>
