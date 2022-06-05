<template>
  <div>
    <n-modal v-model:show="dialogShow" :bordered="false" preset="card" class="w-[1024px]" :mask-closable="true">
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
          <n-list-item v-for="(item, index) in list" :key="index" @click="handleItemClick(index)">
            <div
              :class="`${isItemSelect(item) ? 'border-blue-600' : 'border-slate-200'}`"
              class="border block bg-no-repeat bg-cover bg-center"
            >
              <span v-if="!isImage(item)">{{ item.suffix }}</span>
              <n-image v-else :src="item.path" preview-disabled object-fit="contain" /></div
          ></n-list-item></div
      ></n-list>
    </n-modal>
    <attachment-upload-modal v-model:visible="uploadVisible" />
  </div>
</template>
<script lang="ts" setup>
import { computed, ref } from 'vue';

const list = [
  {
    id: 14,
    name: 'Wordmark',
    path: 'https://demo.halo.run/upload/2022/02/Wordmark-889c195cc43a4c0088eb79447192b90f.png',
    fileKey: 'upload/2022/02/Wordmark-889c195cc43a4c0088eb79447192b90f.png',
    thumbPath: '/upload/2022/02/Wordmark-889c195cc43a4c0088eb79447192b90f-thumbnail.png',
    mediaType: 'image/png',
    suffix: 'png',
    width: 1200,
    height: 600,
    size: 91779,
    type: 'LOCAL',
    createTime: 1644555116916
  },
  {
    id: 13,
    name: 'unsplash00011',
    path: 'https://demo.halo.run/upload/2022/02/unsplash00011-334c04ab00f24a399d6bf974475cc941.jpg',
    fileKey: 'upload/2022/02/unsplash00011-334c04ab00f24a399d6bf974475cc941.jpg',
    thumbPath: '/upload/2022/02/unsplash00011-334c04ab00f24a399d6bf974475cc941-thumbnail.jpg',
    mediaType: 'image/jpeg',
    suffix: 'jpg',
    width: 6016,
    height: 4016,
    size: 476059,
    type: 'LOCAL',
    createTime: 1644554964628
  },
  {
    id: 12,
    name: 'unsplash00010',
    path: 'https://demo.halo.run/upload/2022/02/unsplash00010-eade87cd8a84420fb0e5ddd2983c86b4.jpg',
    fileKey: 'upload/2022/02/unsplash00010-eade87cd8a84420fb0e5ddd2983c86b4.jpg',
    thumbPath: '/upload/2022/02/unsplash00010-eade87cd8a84420fb0e5ddd2983c86b4-thumbnail.jpg',
    mediaType: 'image/jpeg',
    suffix: 'jpg',
    width: 4633,
    height: 3500,
    size: 530708,
    type: 'LOCAL',
    createTime: 1644554861799
  },
  {
    id: 11,
    name: 'unsplash00008',
    path: 'https://demo.halo.run/upload/2022/02/unsplash00008-df3c45adc66045d0874df6fe668a86e7.jpg',
    fileKey: 'upload/2022/02/unsplash00008-df3c45adc66045d0874df6fe668a86e7.jpg',
    thumbPath: '/upload/2022/02/unsplash00008-df3c45adc66045d0874df6fe668a86e7-thumbnail.jpg',
    mediaType: 'image/jpeg',
    suffix: 'jpg',
    width: 5391,
    height: 3594,
    size: 225127,
    type: 'LOCAL',
    createTime: 1644554859550
  },
  {
    id: 10,
    name: 'unsplash00007',
    path: 'https://demo.halo.run/upload/2022/02/unsplash00007-e2bd7f562c774a45bf1d3cba9eba35cc.jpg',
    fileKey: 'upload/2022/02/unsplash00007-e2bd7f562c774a45bf1d3cba9eba35cc.jpg',
    thumbPath: '/upload/2022/02/unsplash00007-e2bd7f562c774a45bf1d3cba9eba35cc-thumbnail.jpg',
    mediaType: 'image/jpeg',
    suffix: 'jpg',
    width: 5184,
    height: 3456,
    size: 267917,
    type: 'LOCAL',
    createTime: 1644554859474
  },
  {
    id: 9,
    name: 'unsplash00009',
    path: 'https://demo.halo.run/upload/2022/02/unsplash00009-8efea311bc3246e6bfcb23513264e88e.jpg',
    fileKey: 'upload/2022/02/unsplash00009-8efea311bc3246e6bfcb23513264e88e.jpg',
    thumbPath: '/upload/2022/02/unsplash00009-8efea311bc3246e6bfcb23513264e88e-thumbnail.jpg',
    mediaType: 'image/jpeg',
    suffix: 'jpg',
    width: 4000,
    height: 3000,
    size: 238188,
    type: 'LOCAL',
    createTime: 1644554859030
  },
  {
    id: 8,
    name: 'unsplash00005',
    path: 'https://demo.halo.run/upload/2022/02/unsplash00005-a50f6597790d4e239d77d64595eea027.jpg',
    fileKey: 'upload/2022/02/unsplash00005-a50f6597790d4e239d77d64595eea027.jpg',
    thumbPath: '/upload/2022/02/unsplash00005-a50f6597790d4e239d77d64595eea027-thumbnail.jpg',
    mediaType: 'image/jpeg',
    suffix: 'jpg',
    width: 5184,
    height: 3888,
    size: 182861,
    type: 'LOCAL',
    createTime: 1644554857259
  },
  {
    id: 7,
    name: 'unsplash00004',
    path: 'https://demo.halo.run/upload/2022/02/unsplash00004-7970e58c03984f6ba0ed9a27617e45ac.jpg',
    fileKey: 'upload/2022/02/unsplash00004-7970e58c03984f6ba0ed9a27617e45ac.jpg',
    thumbPath: '/upload/2022/02/unsplash00004-7970e58c03984f6ba0ed9a27617e45ac-thumbnail.jpg',
    mediaType: 'image/jpeg',
    suffix: 'jpg',
    width: 5184,
    height: 3888,
    size: 393523,
    type: 'LOCAL',
    createTime: 1644554857152
  },
  {
    id: 6,
    name: 'unsplash00006',
    path: 'https://demo.halo.run/upload/2022/02/unsplash00006-55c1cd41aa3a41a6a6c7e2f695329dd5.png',
    fileKey: 'upload/2022/02/unsplash00006-55c1cd41aa3a41a6a6c7e2f695329dd5.png',
    thumbPath: '/upload/2022/02/unsplash00006-55c1cd41aa3a41a6a6c7e2f695329dd5-thumbnail.png',
    mediaType: 'image/png',
    suffix: 'png',
    width: 2560,
    height: 1600,
    size: 678828,
    type: 'LOCAL',
    createTime: 1644554856219
  },
  {
    id: 5,
    name: 'unsplash00003',
    path: 'https://demo.halo.run/upload/2022/02/unsplash00003-e08bc8eb2c054c6296d715a34e382d10.jpg',
    fileKey: 'upload/2022/02/unsplash00003-e08bc8eb2c054c6296d715a34e382d10.jpg',
    thumbPath: '/upload/2022/02/unsplash00003-e08bc8eb2c054c6296d715a34e382d10-thumbnail.jpg',
    mediaType: 'image/jpeg',
    suffix: 'jpg',
    width: 6000,
    height: 4000,
    size: 1128400,
    type: 'LOCAL',
    createTime: 1644554855140
  },
  {
    id: 4,
    name: 'unsplash00002',
    path: 'https://demo.halo.run/upload/2022/02/unsplash00002-b87452bc7f83426799c2a637c5f5a267.jpg',
    fileKey: 'upload/2022/02/unsplash00002-b87452bc7f83426799c2a637c5f5a267.jpg',
    thumbPath: '/upload/2022/02/unsplash00002-b87452bc7f83426799c2a637c5f5a267-thumbnail.jpg',
    mediaType: 'image/jpeg',
    suffix: 'jpg',
    width: 5472,
    height: 3648,
    size: 240923,
    type: 'LOCAL',
    createTime: 1644554854960
  }
];
interface Props {
  visible: boolean;
  title?: string;
  multiSelect: boolean;
}

interface Emits {
  (e: 'update:visible', value: boolean): void;
}
const emit = defineEmits<Emits>();

const props = withDefaults(defineProps<Props>(), {
  visible: false,
  title: '选择附件',
  multiSelect: false
});

const uploadVisible = ref<boolean>(false);
const dialogShow = computed({
  get: () => props.visible,
  set: val => emit('update:visible', val)
});
function handleItemClick(attachment: any) {
  console.log(attachment);
}
function isItemSelect(attachment: any) {
  return list.findIndex(item => item.id === attachment.id) > -1;
}

function isImage(attachment: any) {
  if (!attachment || !attachment.mediaType) {
    return false;
  }
  return attachment.mediaType.startsWith('image');
}
</script>
