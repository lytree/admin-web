<template>
  <n-modal
    v-model:show="dialogShow"
    :bordered="false"
    preset="card"
    class="w-[1024px]"
    title="选择附件"
    :mask-closable="true"
    @after-enter="init"
    @after-leave="setEmpty"
  >
    <n-card>
      <n-form ref="formRef" label-width="80">
        <div class="grid grid-cols-4 gap-4">
          <NFormItem label="关键词：" path="user.name">
            <NInput clearable />
          </NFormItem>
          <NFormItem label="存储位置：" path="user.age">
            <NSelect clearable :options="saveType" label-field="text" value-field="type" />
          </NFormItem>
          <NFormItem label="文件类型：" path="phone">
            <NSelect clearable :options="mediaType" />
          </NFormItem>
          <NFormItem>
            <NButton attr-type="button"> 查询 </NButton>
            <NButton attr-type="button"> 重置 </NButton>
          </NFormItem>
        </div>
      </n-form>
      <div class="mb-0">
        <n-button attr-type="button" @click="uploadVisible = true"> 上传 </n-button>
      </div>
      <n-divider />
      <n-list bordered
        ><div class="grid grid-cols-6 content-start">
          <n-list-item
            v-for="(item, index) in attachmentsList"
            :key="index"
            @mouseenter="modifyHover(item, 'hover', true)"
            @mouseleave="modifyHover(item, 'hover', false)"
            @click="handleItemClick(item)"
          >
            <div
              class="max-h-[240px] max-w-[240px] border-none block bg-no-repeat bg-cover bg-center relative cursor-pointer overflow-hidden rounded-sm border-solid bg-white transition-all hover:shadow-sm"
            >
              <span v-if="!isImage(item)">{{ item.name }}</span>
              <n-image preview-disabled v-else class="block" :src="item.thumbnail" object-fit="fill"
                ><template #placeholder>
                  <div
                    style="
                      width: 100%;
                      height: 100%;
                      display: flex;
                      align-items: center;
                      justify-content: center;
                      background-color: #0001;
                    "
                  >
                    Loading
                  </div>
                </template></n-image
              >
              <ant-design-check-circle-outlined
                v-show="isItemSelect(item) && !item.hover"
                class="absolute top-1 right-1 cursor-pointer font-bold transition-all"
                :style="{ fontSize: '20px', color: 'rgb(37 99 235)' }"
              ></ant-design-check-circle-outlined>
              <ant-design-profile-twotone
                v-show="item.hover"
                class="absolute top-1 right-1 cursor-pointer font-bold transition-all"
                :style="{ fontSize: '20px' }"
                @click.stop="handleOpenDetail(item)"
              ></ant-design-profile-twotone>
            </div>
          </n-list-item>
        </div>
      </n-list>
      <template #footer>
        <n-space justify="end">
          <n-pagination
            v-model:page="paginationReactive.page"
            v-model:page-size="paginationReactive.pageSize"
            :page-count="paginationReactive.pageCount"
            show-size-picker
            :page-sizes="[
              {
                label: '6 条/每页',
                value: 6
              },
              {
                label: '12 条/每页',
                value: 12
              },
              {
                label: '18 条/每页',
                value: 18
              },
              {
                label: '24 条/每页',
                value: 24
              },
              {
                label: '30 条/每页',
                value: 30
              },
              {
                label: '36 条/每页',
                value: 36
              }
            ]"
            @update-page="updatePage"
            @update:page-size="updatePageSize"
          /> </n-space
      ></template>
    </n-card>
    <template #footer
      ><n-space justify="end">
        <n-button @click="dealSelected">确认</n-button><n-button @click="setEmpty">取消</n-button></n-space
      ></template
    ><attachment-upload-modal v-model:visible="uploadVisible" @before-leave="updateAttachmentsList" />
    <attachment-detail-modal v-model:visible="detailVsiible" :attachment="current" />
  </n-modal>
</template>
<script lang="ts" setup>
import { computed, ref } from 'vue';
import {
  AttachmentType,
  listAttachmentsApi,
  listMediaTypes,
  listTypes,
  type AttachmentsDetail
} from '@/service/api/attachments';
import { Pagination, resetPagination } from '@/views/document/common';
import AntDesignProfileTwotone from '~icons/ant-design/profile-twotone';
import AntDesignCheckCircleOutlined from '~icons/ant-design/check-circle-outlined';
const paginationReactive = ref<Pagination>(resetPagination());
const uploadVisible = ref<boolean>(false);
const attachmentsList = ref<AttachmentsDetail[]>([]);
const saveType = ref<Array<{ type: string; text: string }>>([]);
const mediaType = ref<Array<{ value: string; label: string }>>([]);
const selected = ref<AttachmentsDetail[]>([]);
const current = ref<AttachmentsDetail | null>(null);
const detailVsiible = ref<boolean>(false);
const dialogShow = computed({
  get: () => props.visible,
  set: val => emit('update:visible', val)
});

interface Props {
  visible: boolean;
  title?: string;
  multiSelect?: boolean;
  onSaveAfter?: Function;
}

interface Emits {
  (e: 'update:visible', value: boolean): void;
}
const emit = defineEmits<Emits>();

const props = withDefaults(defineProps<Props>(), {
  visible: false,
  title: '选择附件',
  multiSelect: true
});

function handleItemClick(attachment: AttachmentsDetail) {
  const isSelect = selected.value.findIndex(item => item.id === attachment.id) > -1;
  isSelect ? handleUnselect(attachment) : handleSelect(attachment);
}
function handleSelect(attachment: AttachmentsDetail) {
  if (props.multiSelect) {
    selected.value = [...selected.value, attachment];
  } else {
    selected.value = [attachment];
  }
}

function handleUnselect(attachment: AttachmentsDetail) {
  selected.value = selected.value.filter(item => item.id !== attachment.id);
}
function isItemSelect(attachment: AttachmentsDetail) {
  return selected.value.findIndex(item => item.id === attachment.id) > -1;
}
function handleOpenDetail(attachment: AttachmentsDetail) {
  current.value = attachment;
  detailVsiible.value = true;
}
function isImage(attachment: AttachmentsDetail) {
  if (!attachment || !attachment.mediaType) {
    return false;
  }
  return attachment.mediaType.startsWith('image');
}
function modifyHover(item: any, field: string, value: any) {
  item[field] = value;
}
function updatePageSize(pageSize: number) {
  updateAttachmentsList(1, pageSize);
}
function updatePage(page: number) {
  updateAttachmentsList(page, null);
}
function dealSelected() {
  const onSaveAfter = props.onSaveAfter;
  if (onSaveAfter) {
    onSaveAfter.call(onSaveAfter, selected.value);
    emit('update:visible', false);
  }
}
function updateAttachmentsList(page: null | number, pageSize: number | null) {
  if (page) {
    paginationReactive.value.page = page;
  } else {
    paginationReactive.value.page = 1;
  }
  if (pageSize) {
    paginationReactive.value.pageSize = pageSize;
  }

  listAttachmentsApi({ page: paginationReactive.value.page - 1, size: paginationReactive.value.pageSize }).then(res => {
    if (res.data) {
      attachmentsList.value = res.data.content;
      paginationReactive.value.page = res.data.page + 1;
      paginationReactive.value.pageCount = res.data.pages;
      paginationReactive.value.itemCount = res.data.total;
      paginationReactive.value.pageSize = res.data.rpp;
      getListMediaTypes();
      getListTypes();
    }
  });
}
function getListTypes() {
  listTypes().then(req => {
    if (req.data) {
      req.data.forEach((value, _index) => {
        saveType.value.push(AttachmentType[value]);
      });
    }
  });
}
function getListMediaTypes() {
  listMediaTypes().then(req => {
    if (req.data) {
      req.data.forEach((value, _index) => {
        mediaType.value.push({
          label: value,
          value: value
        });
      });
    }
  });
}
function init() {
  listAttachmentsApi({ page: 0, size: 12 }).then(res => {
    if (res.data) {
      attachmentsList.value = res.data.content;
      paginationReactive.value.page = res.data.page + 1;
      paginationReactive.value.pageCount = res.data.pages;
      paginationReactive.value.itemCount = res.data.total;
      paginationReactive.value.pageSize = res.data.rpp;
      getListMediaTypes();
      getListTypes();
    }
  });
}
function setEmpty() {
  selected.value = [];
  current.value = null;
  emit('update:visible', false);
}
</script>
