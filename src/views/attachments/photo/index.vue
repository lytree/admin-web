<template>
  <n-card>
    <n-form ref="formRef" label-width="80">
      <div class="grid grid-cols-4 gap-4">
        <n-form-item label="关键词：" path="user.name">
          <n-input clearable />
        </n-form-item>
        <n-form-item label="存储位置：" path="user.age">
          <n-select clearable :options="saveType" label-field="text" value-field="type" />
        </n-form-item>
        <n-form-item label="文件类型：" path="phone">
          <n-select clearable :options="mediaType" />
        </n-form-item>
        <n-form-item>
          <n-button attr-type="button"> 查询 </n-button>
          <n-button attr-type="button"> 重置 </n-button>
        </n-form-item>
      </div>
    </n-form>
    <div class="mb-0">
      <n-button attr-type="button" @click="uploadVisible = true"> 上传 </n-button>
    </div>
    <n-divider /><n-image-group>
      <n-list bordered
        ><div class="grid grid-cols-6 content-start">
          <n-list-item v-for="(item, index) in attachmentsList" :key="index" @click="handleItemClick(index)">
            <div
              class="border block bg-no-repeat bg-cover bg-center relative cursor-pointer overflow-hidden rounded-sm border-solid bg-white transition-all hover:shadow-sm"
            >
              <span v-if="!isImage(item)">{{ item.name }}</span>
              <n-image preview-disabled v-else class="block" :src="item.url" object-fit="fill" />
            </div>
          </n-list-item>
        </div> </n-list
    ></n-image-group>
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
          @update-page="updateAttachmentsList(null)"
          @update:page-size="updateAttachmentsList(1)"
        /> </n-space></template
    ><attachment-upload-modal v-model:visible="uploadVisible" @before-leave="updateAttachmentsList" />
  </n-card>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import {
  AttachmentType,
  listAttachmentsApi,
  listMediaTypes,
  listTypes,
  type AttachmentsDetail
} from '@/service/api/attachments';
import { Pagination, resetPagination } from '@/views/document/common';
const paginationReactive = ref<Pagination>(resetPagination());
const uploadVisible = ref<boolean>(false);
const attachmentsList = ref<AttachmentsDetail[]>([]);
const saveType = ref<Array<{ type: string; text: string }>>([]);
const mediaType = ref<Array<{ value: string; label: string }>>([]);
function handleItemClick(attachment: any) {
  console.log(attachment);
}

function isImage(attachment: any) {
  if (!attachment || !attachment.mediaType) {
    return false;
  }
  return attachment.mediaType.startsWith('image');
}
function updateAttachmentsList(page: null | number) {
  if (page) {
    paginationReactive.value.page = page;
  }
  listAttachmentsApi({ page: paginationReactive.value.page - 1, size: paginationReactive.value.pageSize }).then(res => {
    if (res.data) {
      attachmentsList.value = res.data.content;
      paginationReactive.value.page = res.data.page + 1;
      paginationReactive.value.pageCount = res.data.pages;
      paginationReactive.value.itemCount = res.data.total;
      paginationReactive.value.pageSize = res.data.rpp;
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
onMounted(async () => {
  const { data } = await listAttachmentsApi({ page: 0, size: 12 });
  if (data) {
    attachmentsList.value = data.content;
    paginationReactive.value.page = data.page + 1;
    paginationReactive.value.pageCount = data.pages;
    paginationReactive.value.itemCount = data.total;
    paginationReactive.value.pageSize = data.rpp;
    getListMediaTypes();
    getListTypes();
  }
});
</script>
