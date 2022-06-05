<template>
  <file-pond
    class="w-full"
    :name="name"
    :files="fileList"
    :allow-multiple="multiple"
    :max-files="maxFiles"
    :max-parallel-uploads="maxParallelUploads"
    :label-idle="label"
    :allow-image-preview="allowImagePreview"
    allow-revert="false"
    file-validate-type-label-expected-types="请选择 {lastType} 格式的文件"
    label-file-processing="上传中"
    label-file-processing-aborted="取消上传"
    label-file-processing-complete="上传完成"
    label-file-processing-error="上传错误"
    label-file-type-not-allowed="不支持当前文件格式"
    label-tap-to-cancel="点击取消"
    label-tap-to-retry="点击重试"
  ></file-pond>
</template>
<script lang="ts" setup>
import { computed } from 'vue';
import vueFilePond from 'vue-filepond';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css';

// Create component
const FilePond = vueFilePond(FilePondPluginFileValidateType, FilePondPluginImagePreview);

interface Props {
  name?: string;
  field?: string;
  multiple?: boolean;
  accepts?: string[];
  label?: string;
  uploadHandler: Function;
}
withDefaults(defineProps<Props>(), {
  name: 'file',
  field: 'file',
  multiple: false,
  accepts: () => {
    return [];
  },
  label: '点击选择文件或将文件拖拽到此处'
});
const fileList: string[] = [];

const maxParallelUploads = computed(() => {
  return 100;
});
const allowImagePreview = computed(() => {
  return false;
});
const maxFiles = computed(() => {
  return 50;
});
</script>
