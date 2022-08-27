<template>
  <n-card>
    <n-form ref="formRef" label-width="80">
      <div class="grid grid-cols-4 gap-4">
        <n-form-item label="关键词：" path="user.name">
          <n-input />
        </n-form-item>
        <n-form-item label="存储位置：" path="user.age">
          <n-select />
        </n-form-item>
        <n-form-item label="文件类型：" path="phone">
          <n-select />
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
    <n-divider />
    <n-list bordered
      ><div class="grid grid-cols-6 content-start">
        <n-list-item v-for="(item, index) in attachmentsList" :key="index" @click="handleItemClick(index)">
          <div
            :class="`${isItemSelect(item) ? 'border-blue-600' : 'border-slate-200'}`"
            class="border block bg-no-repeat bg-cover bg-center"
          >
            <span v-if="!isImage(item)">{{ item.name }}</span>
            <n-image v-else :src="item.url" preview-disabled object-fit="contain" />
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
          @update-page="updateAttachmentsList"
          @page-size-change="updateAttachmentsList"
        /> </n-space></template
    ><attachment-upload-modal v-model:visible="uploadVisible" @before-leave="updateAttachmentsList" />
  </n-card>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { listAttachmentsApi, type AttachmentsDetail } from '@/service/api/attachments';
import { Pagination, resetPagination } from '@/views/document/common';
const paginationReactive = ref<Pagination>(resetPagination());
const uploadVisible = ref<boolean>(false);
const attachmentsList = ref<AttachmentsDetail[]>([]);
function handleItemClick(attachment: any) {
  console.log(attachment);
}
function isItemSelect(attachment: AttachmentsDetail) {
  return attachmentsList.value.findIndex(item => item.id === attachment.id) > -1;
}

function isImage(attachment: any) {
  if (!attachment || !attachment.mediaType) {
    return false;
  }
  return attachment.mediaType.startsWith('image');
}
function updateAttachmentsList() {
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
onMounted(async () => {
  const { data } = await listAttachmentsApi({ page: 0, size: 12 });
  if (data) {
    attachmentsList.value = data.content;
    paginationReactive.value.page = data.page + 1;
    paginationReactive.value.pageCount = data.pages;
    paginationReactive.value.itemCount = data.total;
    paginationReactive.value.pageSize = data.rpp;
  }
});
</script>
